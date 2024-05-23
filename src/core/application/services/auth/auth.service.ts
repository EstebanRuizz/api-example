import { Injectable, UnauthorizedException } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { AuthDTO } from '../../DTO/AuthDTO';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(authDTO: AuthDTO): Promise<{ access_token: string }> {
    const user = await this.usersService.findByEmail(authDTO.email);
    if (user?.password !== authDTO.password) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.name };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
