import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { Role } from 'src/core/domain/models/Role';
import { User } from 'src/core/domain/models/User';

export class SqliteConfig {
  public static getSequelizeModuleOptions(): SequelizeModuleOptions {
    return {
      dialect: 'sqlite',
      storage: 'database.sqlite',
      models: [User, Role],
      autoLoadModels: true,
      synchronize: true,
    };
  }
}
