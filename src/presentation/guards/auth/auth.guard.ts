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

@Injectable()
export class AuthGuard implements CanActivate {
  public constructor(
    private readonly jwtService: JwtService,
    private readonly localEntitiesByRoleService: LocalEntitiesByRoleService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    this.getEndPointName(context);
    const request = context.switchToHttp().getRequest();

    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    await this.verifyToken(token, request);
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private async verifyToken(token: string, request: Request): Promise<void> {
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }
  }

  private getEndPointName(context: ExecutionContext): void {
    const request = context.switchToHttp().getRequest();
    const pathId: string = [
      `[${request.method}]`,
      `[${Reflect.getMetadata('path', context.getClass())}]`,
      `[${request.url}]`,
    ].join('');
    console.log(pathId);
  }
}
