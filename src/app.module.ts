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

@Module({
  imports: [
    SequelizeModule.forRoot(SqliteConfig.getSequelizeModuleOptions()),
    SequelizeModule.forFeature([UserConfig, RoleConfig]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [UserController, AuthController, RoleController],
  providers: [
    ProductService,
    UserService,
    AuthService,
    RolesService,
    HttpRoutesService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('user');
  }
}
