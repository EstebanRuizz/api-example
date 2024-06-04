import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { ProductService } from './core/application/services/product/product.service';
import { UserService } from './core/application/services/user/user.service';
import { AuthService } from './core/application/services/auth/auth.service';
import { HttpRoutesService } from './core/application/services/http-routes/http-routes.service';
import { EntitiesByRoleService } from './core/application/services/entities-by-role/entities-by-role.service';
import { EntitiesService } from './core/application/services/entities/entities.service';

import { UserController } from './presentation/controllers/user/user.controller';
import { AuthController } from './presentation/controllers/auth/auth.controller';
import { RoleController } from './presentation/controllers/role/role.controller';
import { EntityByRoleController } from './presentation/controllers/entity-by-role/entity-by-role.controller';
import { EntityController } from './presentation/controllers/entity/entity.controller';

import { LoggerMiddleware } from './presentation/middleware/LoggerMiddleware';

import { SqliteConfig } from './infrastructure/persistence/Sqlite/SqliteConfig';
import { MssqlConfig } from './infrastructure/persistence/SqlServer/MssqlConfig';

import { jwtConstants } from './infrastructure/auth/constants';

import { UserConfig } from './infrastructure/persistence/Sqlite/config/UserConfig';
import { RoleConfig } from './infrastructure/persistence/Sqlite/config/RoleConfig';
import { EntitiesByRoleConfig } from './infrastructure/persistence/Sqlite/config/EntitiesByRoleConfig';
import { EntitiesConfig } from './infrastructure/persistence/Sqlite/config/EntitiesConfig';
import { UserJWTSessionConfig } from './infrastructure/persistence/Sqlite/config/UserJWTSessionConfig';
import { EnumDatabase } from './core/application/enums/EnumDatabase';
import { InfrastructureService } from './core/application/services/infrastructure/infrastructure.service';
import { InfrastructureController } from './presentation/controllers/infrastructure/infrastructure.controller';
import { SecurityApiRolesService } from './core/application/services/securtity-apiroles/security-apiroles.service';
import { ExternalDBRolesService } from './core/application/services/roles/external-db-roles.service';
import { Dialect } from 'sequelize';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      name: EnumDatabase.mssqlConnection,
      useFactory: async (configService: ConfigService) => ({
        dialect: configService.get<string>(
          'external_database_dialect',
        ) as Dialect,
        host: configService.get<string>('external_database_host'),
        port: parseInt(configService.get<string>('external_database_port'), 10),
        username: configService.get<string>('external_database_username'),
        password: configService.get<string>('external_database_password'),
        database: configService.get<string>('external_database_database'),
        models: [UserConfig, RoleConfig, EntitiesByRoleConfig, EntitiesConfig],
        autoLoadModels: true,
        synchronize: true,
      }),
    }),
    SequelizeModule.forFeature(
      [UserConfig, RoleConfig, EntitiesByRoleConfig, EntitiesConfig],
      EnumDatabase.mssqlConnection,
    ),

    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      name: EnumDatabase.sqliteConnection,
      useFactory: async (configService: ConfigService) => ({
        dialect: configService.get<string>(
          'localJWTSession_database_dialect',
        ) as Dialect,
        storage: configService.get<string>('localJWTSession_database_storage'),
        autoLoadModels: true,
        synchronize: true,
        models: [
          EntitiesByRoleConfig,
          UserJWTSessionConfig,
          RoleConfig,
          EntitiesConfig,
        ],
      }),
    }),
    SequelizeModule.forFeature(
      [EntitiesByRoleConfig, UserJWTSessionConfig, RoleConfig, EntitiesConfig],
      EnumDatabase.sqliteConnection,
    ),

    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [
    UserController,
    // EntityController,
    // AuthController,
    RoleController,
    InfrastructureController,
    // EntityByRoleController,
  ],
  providers: [
    // ProductService,
    UserService,
    // AuthService,
    HttpRoutesService,
    ExternalDBRolesService,
    InfrastructureService,
    SecurityApiRolesService,
    EntitiesService,
    EntitiesByRoleService,
    MssqlConfig.sequelizeProvider(),
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('user');
  }
}
