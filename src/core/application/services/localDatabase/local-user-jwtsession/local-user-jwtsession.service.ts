import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Guid } from 'guid-typescript';
import { EnumDatabase } from 'src/core/application/enums/EnumDatabase';
import { LocalUserJWTSession } from 'src/infrastructure/persistence/Sqlite/config/LocalUserJWTSession';
import { UserConfig } from 'src/infrastructure/persistence/SqlServer/config/UserConfig';

@Injectable()
export class LocalUserJwtSessionService {
  public constructor(
    @InjectModel(LocalUserJWTSession, EnumDatabase.sqliteConnection)
    private readonly localUserJWTSessionModel: typeof LocalUserJWTSession,
  ) {}

  public async createJWTSessionId(
    user: UserConfig,
  ): Promise<LocalUserJWTSession> {
    return await this.localUserJWTSessionModel.create({
      jwtSessionId: Guid.create().toString(),
      userId: user.id,
      roleFK: user.roleFK,
    });
  }

  public async getByJwtSessionId(
    jwtSessionId: string,
  ): Promise<LocalUserJWTSession> {
    return this.localUserJWTSessionModel.findOne({
      where: {
        jwtSessionId: jwtSessionId,
      },
      raw: true,
    });
  }
}
