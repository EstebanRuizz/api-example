import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { ProductService } from './core/application/services/product/product.service';
import { UserService } from './core/application/services/user/user.service';
import { AuthService } from './core/application/services/auth/auth.service';
import { RolesService } from './core/application/services/roles/roles.service';
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

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SequelizeModule.forRoot({
      ...MssqlConfig.getSequelizeModuleOptions(),
      name: EnumDatabase.mssqlConnection,
    }),
    SequelizeModule.forFeature(
      [UserConfig, RoleConfig, EntitiesByRoleConfig, EntitiesConfig],
      EnumDatabase.mssqlConnection,
    ),
    SequelizeModule.forRoot({
      ...SqliteConfig.getSequelizeModuleOptions(),
      name: EnumDatabase.sqliteConnection,
    }),
    SequelizeModule.forFeature(
      [EntitiesByRoleConfig, UserJWTSessionConfig, RoleConfig],
      EnumDatabase.sqliteConnection,
    ),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [
    // UserController,
    // EntityController,
    // AuthController,
    RoleController,
    // EntityByRoleController,
  ],
  providers: [
    // ProductService,
    // UserService,
    // AuthService,
    RolesService,
    HttpRoutesService,
    // EntitiesByRoleService,
    // EntitiesService,
    // MssqlConfig.sequelizeProvider(),
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('user');
  }
}
