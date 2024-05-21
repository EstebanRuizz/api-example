import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { User } from 'src/core/domain/models/User';

export class SqliteConfig {
  public static getSequelizeModuleOptions(): SequelizeModuleOptions {
    return {
      dialect: 'sqlite',
      storage: 'database.sqlite',
      models: [User],
      autoLoadModels: true,
      synchronize: true,
    };
  }
}
