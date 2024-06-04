import { SequelizeModuleOptions } from '@nestjs/sequelize';

export class SqliteConfig {
  public static getSequelizeModuleOptions(): SequelizeModuleOptions {
    return {
      dialect: 'sqlite',
      storage: 'database.sqlite',
      autoLoadModels: true,
      synchronize: true,
    };
  }
}
