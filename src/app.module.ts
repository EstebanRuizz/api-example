import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ProductService } from './core/application/services/product/product.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './core/domain/models/User';
import { UserService } from './core/application/services/user/user.service';
import { UserController } from './presentation/controllers/user/user.controller';
import { SqliteConfig } from './infrastructure/persistence/SqliteConfig';
import { LoggerMiddleware } from './presentation/middleware/LoggerMiddleware';
import { AuthController } from './presentation/controllers/auth/auth.controller';
import { AuthService } from './core/application/services/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './infrastructure/auth/constants';

@Module({
  imports: [
    SequelizeModule.forRoot(SqliteConfig.getSequelizeModuleOptions()),
    SequelizeModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [UserController, AuthController],
  providers: [ProductService, UserService, AuthService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('user');
  }
}
