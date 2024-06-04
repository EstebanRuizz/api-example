import { Injectable } from '@nestjs/common';
import { HttpRoutesService } from '../http-routes/http-routes.service';
import { EntitiesConfig } from 'src/infrastructure/persistence/Sqlite/config/EntitiesConfig';
import { InjectModel } from '@nestjs/sequelize';
import { HttpRoutesDTO } from '../../DTO/inner/HttpRoutesDTO';
import { EnumDatabase } from '../../enums/EnumDatabase';

@Injectable()
export class EntitiesService {
  public constructor(
    @InjectModel(EntitiesConfig, EnumDatabase.mssqlConnection)
    private readonly exDbAPIEntities: typeof EntitiesConfig,
    private readonly httpRoutes: HttpRoutesService,
  ) {}

  public async syncHttpRoutes(): Promise<EntitiesConfig[]> {
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
        await this.exDbAPIEntities.create(entity);
      } catch (error) {
        console.log(error);
      }
    }
    return await this.exDbAPIEntities.findAll();
  }

  public async getAll(): Promise<EntitiesConfig[]> {
    return this.exDbAPIEntities.findAll();
  }
}
