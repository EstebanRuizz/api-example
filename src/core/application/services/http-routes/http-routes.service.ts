import { HttpServer, INestApplication, Injectable } from '@nestjs/common';
import { HttpRoutesDTO } from '../../DTO/inner/HttpRoutesDTO';

@Injectable()
export class HttpRoutesService {
  private app: INestApplication;

  public setAppInstance(app: INestApplication): void {
    this.app = app;
  }

  public getRoutes(): HttpRoutesDTO[] {
    const server: HttpServer = this.app.getHttpServer();
    const router = server['_events'].request._router;

    const routes = [];
    router.stack.forEach((middleware) => {
      if (middleware.route) {
        const entity: string[] = middleware.route.path.split('/');
        entity.shift();
        routes.push({
          path: middleware.route.path,
          method: Object.keys(middleware.route.methods)[0].toUpperCase(),
          entityName: entity.shift(),
        });
      } else if (middleware.name === 'router') {
        middleware.handle.stack.forEach((handler) => {
          const route = handler.route;
          route &&
            routes.push({
              path: route.path,
              method: Object.keys(route.methods)[0].toUpperCase(),
            });
        });
      }
    });

    return routes as HttpRoutesDTO[];
  }
}
