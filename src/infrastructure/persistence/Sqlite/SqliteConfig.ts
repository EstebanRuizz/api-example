import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { RoleConfig } from './config/RoleConfig';
import { UserJWTSessionConfig } from './config/UserJWTSessionConfig';
import { EntitiesByRoleConfig } from './config/EntitiesByRoleConfig';
import { EntitiesConfig } from './config/EntitiesConfig';

export class SqliteConfig {
  public static getSequelizeModuleOptions(): SequelizeModuleOptions {
    return {
      dialect: 'sqlite',
      storage: 'database.sqlite',
      models: [
        UserJWTSessionConfig,
        RoleConfig,
        EntitiesByRoleConfig,
        EntitiesConfig,
      ],
      autoLoadModels: true,
      synchronize: true,
    };
  }
}
