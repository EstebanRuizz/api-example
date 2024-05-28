import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { LoggingInterceptor } from './presentation/interceptors/LoggingInterceptor';
import { TransformInterceptor } from './presentation/interceptors/TransformInterceptor';
import { HttpRoutesService } from './core/application/services/http-routes/http-routes.service';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalInterceptors(new TransformInterceptor());

  const routesService = app.get(HttpRoutesService);
  routesService.setAppInstance(app);

  await app.listen(3000);
}
bootstrap();
