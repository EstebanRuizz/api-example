import { Injectable } from '@nestjs/common';
import { HttpRoutesService } from '../http-routes/http-routes.service';
import { EntitiesConfig } from 'src/infrastructure/persistence/Sqlite/config/EntitiesConfig';
import { InjectModel } from '@nestjs/sequelize';
import { HttpRoutesDTO } from '../../DTO/inner/HttpRoutesDTO';

@Injectable()
export class EntitiesService {
  public constructor(
    @InjectModel(EntitiesConfig)
    private readonly entityModel: typeof EntitiesConfig,
    private readonly httpRoutes: HttpRoutesService,
  ) {}

  public async syncHttpRoutes(): Promise<void> {
    const httpRoutesDTO: HttpRoutesDTO[] = this.httpRoutes.getRoutes();

    for (const route of httpRoutesDTO) {
      const entity = {
        entityName: route.entityName,
        entityRoute: route.path,
        entityMethod: route.method,
        concatenatedEndPoint: [route.entityName, route.path, route.method].join(
          '-',
        ),
      };
      try {
        await this.entityModel.create(entity);
      } catch (error) {}
    }
  }

  public async getAll(): Promise<EntitiesConfig[]> {
    return this.entityModel.findAll();
  }
}
