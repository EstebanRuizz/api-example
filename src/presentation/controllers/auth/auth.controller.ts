import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from '../../../core/application/services/auth/auth.service';
import { AuthDTO } from 'src/core/application/DTO/AuthDTO';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() authDTO: AuthDTO) {
    return this.authService.signIn(authDTO);
  }
}
