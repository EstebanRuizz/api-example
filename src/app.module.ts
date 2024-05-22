import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ProductService } from './core/application/services/product/product.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './core/domain/models/User';
import { UserService } from './core/application/services/user/user.service';
import { UserController } from './presentation/controllers/user/user.controller';
import { SqliteConfig } from './infrastructure/persistence/SqliteConfig';
import { LoggerMiddleware } from './presentation/middleware/LoggerMiddleware';

@Module({
  imports: [
    SequelizeModule.forRoot(SqliteConfig.getSequelizeModuleOptions()),
    SequelizeModule.forFeature([User]),
  ],
  controllers: [UserController],
  providers: [ProductService, UserService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('user');
  }
}
