import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ProductService } from './core/application/services/product/product.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserService } from './core/application/services/user/user.service';
import { UserController } from './presentation/controllers/user/user.controller';
import { SqliteConfig } from './infrastructure/persistence/Sqlite/SqliteConfig';
import { LoggerMiddleware } from './presentation/middleware/LoggerMiddleware';
import { AuthController } from './presentation/controllers/auth/auth.controller';
import { AuthService } from './core/application/services/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './infrastructure/auth/constants';
import { RoleController } from './presentation/controllers/role/role.controller';
import { RolesService } from './core/application/services/roles/roles.service';
import { UserConfig } from './infrastructure/persistence/Sqlite/config/UserConfig';
import { RoleConfig } from './infrastructure/persistence/Sqlite/config/RoleConfig';
import { HttpRoutesService } from './core/application/services/http-routes/http-routes.service';
import { EntityByRoleController } from './presentation/controllers/entity-by-role/entity-by-role.controller';
import { EntitiesByRoleConfig } from './infrastructure/persistence/Sqlite/config/EntitiesByRoleConfig';
import { EntitiesByRoleService } from './core/application/services/entities-by-role/entities-by-role.service';
import { EntitiesService } from './core/application/services/entities/entities.service';
import { EntitiesConfig } from './infrastructure/persistence/Sqlite/config/EntitiesConfig';
import { EntityController } from './presentation/controllers/entity/entity.controller';
import { ConfigModule } from '@nestjs/config';
import { MssqlConfig } from './infrastructure/persistence/SqlServer/MssqlConfig';
import { UserJWTSessionConfig } from './infrastructure/persistence/Sqlite/config/UserJWTSessionConfig';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SequelizeModule.forRoot({
      ...SqliteConfig.getSequelizeModuleOptions(),
      models: [
        UserJWTSessionConfig,
        UserConfig,
        RoleConfig,
        EntitiesByRoleConfig,
        EntitiesConfig,
      ],
    }),
    SequelizeModule.forRoot(MssqlConfig.getSequelizeModuleOptions()),
    SequelizeModule.forFeature([
      UserJWTSessionConfig,
      UserConfig,
      RoleConfig,
      EntitiesByRoleConfig,
      EntitiesConfig,
    ]),

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
    EntityByRoleController,
  ],
  providers: [
    ProductService,
    UserService,
    AuthService,
    RolesService,
    HttpRoutesService,
    EntitiesByRoleService,
    EntitiesService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('user');
  }
}
