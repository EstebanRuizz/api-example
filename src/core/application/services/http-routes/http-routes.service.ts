import { HttpServer, INestApplication, Injectable } from '@nestjs/common';

@Injectable()
export class HttpRoutesService {
  private app: INestApplication;

  public setAppInstance(app: INestApplication): void {
    this.app = app;
  }

  public getRoutes(): string[] {
    const server: HttpServer = this.app.getHttpServer();
    const router = server['_events'].request._router;

    const routes = [];
    router.stack.forEach((middleware) => {
      if (middleware.route) {
        // Routes registered directly on the app
        routes.push({
          path: middleware.route.path,
          method: Object.keys(middleware.route.methods)[0].toUpperCase(),
        });
      } else if (middleware.name === 'router') {
        // Router middleware (nested routes)
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

    return routes;
  }
}

