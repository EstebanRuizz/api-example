import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { LoggingInterceptor } from './presentation/interceptors/LoggingInterceptor';
import { TransformInterceptor } from './presentation/interceptors/TransformInterceptor';
import { HttpRoutesService } from './core/application/services/http-routes/http-routes.service';
import { Sequelize } from 'sequelize';
import { MssqlConfig } from './infrastructure/persistence/SqlServer/MssqlConfig';
import { SqliteConfig } from './infrastructure/persistence/Sqlite/SqliteConfig';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalInterceptors(new TransformInterceptor());

  const routesService = app.get(HttpRoutesService);
  routesService.setAppInstance(app);

  const mssqlConnection = new Sequelize(
    MssqlConfig.getSequelizeModuleOptions(),
  );
  await mssqlConnection.sync();

  const sqliteConnection = new Sequelize(
    SqliteConfig.getSequelizeModuleOptions(),
  );
  await sqliteConnection.sync();

  await app.listen(3000);
}
bootstrap();
