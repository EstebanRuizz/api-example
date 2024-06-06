import { HttpException, HttpStatus } from '@nestjs/common';

export class NoAuthTokenException extends HttpException {
  constructor() {
    super('No authentication token provided', HttpStatus.UNAUTHORIZED);
  }
}
