import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/infrastructure/auth/constants';
import { LocalEntitiesByRoleService } from 'src/core/application/services/localDatabase/local-entities-by-role/local-entities-by-role.service';
import { HttpRoutesService } from 'src/core/application/services/http-routes/http-routes.service';
import { Reflector } from '@nestjs/core';
import { NoAuthTokenException } from 'src/presentation/exceptions/NoAuthTokenException';
import { LocalEntities } from 'src/infrastructure/persistence/Sqlite/config/LocalEntities';
import { LocalEntitiesService } from 'src/core/application/services/localDatabase/local-entities/local-entities.service';
import { PayloadDTO } from 'src/core/application/DTO/inner/jwt/PayloadDTO';
import { LocalUserJwtSessionService } from 'src/core/application/services/localDatabase/local-user-jwtsession/local-user-jwtsession.service';
import { LocalUserJWTSession } from 'src/infrastructure/persistence/Sqlite/config/LocalUserJWTSession';

@Injectable()
export class AuthGuard implements CanActivate {
  private currentPayload: PayloadDTO;
  private currentContext: ExecutionContext;
  private localEntityEndPoint: LocalEntities;
  private localUserJWTSession: LocalUserJWTSession;

  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
    private readonly httpRoutesService: HttpRoutesService,
    private readonly localEntitiesService: LocalEntitiesService,
    private readonly localEntitiesByRoleService: LocalEntitiesByRoleService,
    private readonly localUserJwtSessionService: LocalUserJwtSessionService,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    this.currentContext = context;
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new NoAuthTokenException();
    }

    await this.verifyTokenSign(token, request);
    await this.verifyAuthorization();
    await this.verifyRolePermissionEndPoint();

    return true;
  }

  private async verifyRolePermissionEndPoint(): Promise<void> {
    const roleByEntity =
      await this.localEntitiesByRoleService.findOneWhereRoleEntity(
        this.localUserJWTSession.roleFK,
        this.localEntityEndPoint.id,
      );
    if (!roleByEntity) {
      throw new NoAuthTokenException();
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private async verifyTokenSign(
    token: string,
    request: Request,
  ): Promise<void> {
    try {
      this.currentPayload = await this.jwtService.verifyAsync<PayloadDTO>(
        token,
        {
          secret: jwtConstants.secret,
        },
      );
      request['user'] = this.currentPayload;
    } catch {
      throw new UnauthorizedException();
    }
  }

  private async verifyAuthorization(): Promise<void> {
    this.localUserJWTSession =
      await this.localUserJwtSessionService.getByJwtSessionId(
        this.currentPayload.jwtSessionId.toString(),
      );

    this.localEntityEndPoint = await this.localEntitiesService.findByEndPoint(
      this.getEndPointName(),
    );

    if (!this.localEntityEndPoint || !this.localUserJWTSession) {
      throw new NoAuthTokenException();
    }
  }

  private getEndPointName() {
    const request = this.currentContext.switchToHttp().getRequest();
    const path =
      this.reflector.get<string>('path', this.currentContext.getHandler()) ??
      '';
    const basePath =
      this.reflector.get<string>('path', this.currentContext.getClass()) ?? '';

    const endPoint: string = [
      `[${request.method}]`,
      `[${Reflect.getMetadata('path', this.currentContext.getClass())}]`,
      `[/${basePath}/${path}]`,
    ].join('.');
    return endPoint;
  }
}
