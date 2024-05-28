import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { RoleConfig } from './config/RoleConfig';
import { UserConfig } from './config/UserConfig';

export class SqliteConfig {
  public static getSequelizeModuleOptions(): SequelizeModuleOptions {
    return {
      dialect: 'sqlite',
      storage: 'database.sqlite',
      models: [RoleConfig, UserConfig],
      autoLoadModels: true,
      synchronize: true,
    };
  }
}
