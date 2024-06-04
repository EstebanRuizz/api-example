import { Dialect, Sequelize } from 'sequelize';
import { ConfigService } from '@nestjs/config';
import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { Provider } from '@nestjs/common';

export class MssqlConfig {
  public static getSequelizeModuleOptions(): SequelizeModuleOptions {
    const configService: ConfigService = new ConfigService();
    return {
      dialect: configService.get<string>(
        'external_database_dialect',
      ) as Dialect,
      host: configService.get<string>('external_database_host'),
      port: configService.get<number>('external_database_port'),
      username: configService.get<string>('external_database_username'),
      password: configService.get<string>('external_database_password'),
      database: configService.get<string>('external_database_database'),
      autoLoadModels: true,
      synchronize: true,
    };
  }

  public static sequelizeProvider(): Provider {
    return {
      provide: 'SEQUELIZE',
      useValue: new Sequelize(MssqlConfig.getSequelizeModuleOptions()),
    };
  }
}
