import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';

import { AuthService } from './core/application/services/auth/auth.service';
import { EntitiesByRoleService } from './core/application/services/entities-by-role/entities-by-role.service';
import { EntitiesService } from './core/application/services/entities/entities.service';
import { HttpRoutesService } from './core/application/services/http-routes/http-routes.service';
import { UserService } from './core/application/services/user/user.service';

import { AuthController } from './presentation/controllers/auth/auth.controller';
import { EntityByRoleController } from './presentation/controllers/entity-by-role/entity-by-role.controller';
import { EntityController } from './presentation/controllers/entity/entity.controller';
import { RoleController } from './presentation/controllers/role/role.controller';
import { UserController } from './presentation/controllers/user/user.controller';

import { LoggerMiddleware } from './presentation/middleware/LoggerMiddleware';

import { MssqlConfig } from './infrastructure/persistence/SqlServer/MssqlConfig';

import { jwtConstants } from './infrastructure/auth/constants';

import { Dialect } from 'sequelize';
import { EnumDatabase } from './core/application/enums/EnumDatabase';
import { InfrastructureService } from './core/application/services/infrastructure/infrastructure.service';
import { LocalEntitiesByRoleService } from './core/application/services/localDatabase/local-entities-by-role/local-entities-by-role.service';
import { LocalEntitiesService } from './core/application/services/localDatabase/local-entities/local-entities.service';
import { LocalRoleService } from './core/application/services/localDatabase/local-role/local-role.service';
import { LocalUserJwtSessionService } from './core/application/services/localDatabase/local-user-jwtsession/local-user-jwtsession.service';
import { ExternalDBRolesService } from './core/application/services/roles/external-db-roles.service';
import { SecurityApiRolesService } from './core/application/services/securtity-apiroles/security-apiroles.service';
import { LocalEntities } from './infrastructure/persistence/Sqlite/config/LocalEntities';
import { LocalEntitiesByRole } from './infrastructure/persistence/Sqlite/config/LocalEntitiesByRole';
import { LocalRole } from './infrastructure/persistence/Sqlite/config/LocalRole';
import { LocalUser } from './infrastructure/persistence/Sqlite/config/LocalUser';
import { EntitiesByRoleConfig } from './infrastructure/persistence/SqlServer/config/EntitiesByRoleConfig';
import { EntitiesConfig } from './infrastructure/persistence/SqlServer/config/EntitiesConfig';
import { RoleConfig } from './infrastructure/persistence/SqlServer/config/RoleConfig';
import { UserConfig } from './infrastructure/persistence/SqlServer/config/UserConfig';
import { InfrastructureController } from './presentation/controllers/infrastructure/infrastructure.controller';
import { LocalUserJWTSession } from './infrastructure/persistence/Sqlite/config/LocalUserJWTSession';

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
      name: EnumDatabase.sqliteConnection,
      useFactory: async () => ({
        dialect: 'sqlite',
        storage: './database.sqlite',
        autoLoadModels: true,
        synchronize: true,
        models: [
          LocalUser,
          LocalRole,
          LocalEntities,
          LocalEntitiesByRole,
          LocalUserJWTSession,
        ],
      }),
    }),
    SequelizeModule.forFeature(
      [
        LocalUser,
        LocalRole,
        LocalEntities,
        LocalEntitiesByRole,
        LocalUserJWTSession,
      ],
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
    EntityController,
    AuthController,
    RoleController,
    InfrastructureController,
    EntityByRoleController,
  ],
  providers: [
    UserService,
    AuthService,
    HttpRoutesService,
    ExternalDBRolesService,
    InfrastructureService,
    SecurityApiRolesService,
    EntitiesService,
    EntitiesByRoleService,
    LocalEntitiesByRoleService,
    LocalUserJwtSessionService,
    LocalRoleService,
    LocalEntitiesService,
    MssqlConfig.sequelizeProvider(),
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('user');
  }
}
