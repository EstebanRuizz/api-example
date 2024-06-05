import { Injectable, UnauthorizedException } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { AuthDTO } from '../../DTO/AuthDTO';
import { LocalUserJwtSessionService } from '../localDatabase/local-user-jwtsession/local-user-jwtsession.service';
import { LocalUserJWTSession } from 'src/infrastructure/persistence/Sqlite/config/LocalUserJWTSession';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UserService,
    private readonly localUserJwtSessionService: LocalUserJwtSessionService,
  ) {}

  async signIn(authDTO: AuthDTO): Promise<{ access_token: string }> {
    const user = await this.usersService.findByEmail(authDTO.email);
    if (user?.password !== authDTO.password) {
      throw new UnauthorizedException();
    }
    const userJWTSession: LocalUserJWTSession =
      await this.localUserJwtSessionService.createJWTSessionId(user);

    const payload = {
      jwtSessionId: userJWTSession.jwtSessionId,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
