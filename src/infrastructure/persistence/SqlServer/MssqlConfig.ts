import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { RoleConfig } from './../Sqlite/config/RoleConfig';
import { UserConfig } from './../Sqlite/config/UserConfig';
import { EntitiesConfig } from './../Sqlite/config/EntitiesConfig';
import { EntitiesByRoleConfig } from './../Sqlite/config/EntitiesByRoleConfig';
import { ConfigService } from '@nestjs/config';
import { Dialect } from 'sequelize';
import { UserJWTSessionConfig } from '../Sqlite/config/UserJWTSessionConfig';

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
      autoLoadModels: configService.get<boolean>(
        'external_database_autoLoadModels',
      ),
      synchronize: configService.get<boolean>('external_database_synchronize'),
      models: [
        UserConfig,
        UserJWTSessionConfig,
        RoleConfig,
        EntitiesByRoleConfig,
        EntitiesConfig,
      ],
    };
  }
}
