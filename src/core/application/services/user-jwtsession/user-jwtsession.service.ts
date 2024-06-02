import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserJWTSessionConfig } from 'src/infrastructure/persistence/Sqlite/config/UserJWTSessionConfig';

@Injectable()
export class UserJwtSessionService {
  constructor(
    @InjectModel(UserJWTSessionConfig)
    private readonly userJWTSession: typeof UserJWTSessionConfig,
  ) {}

}
