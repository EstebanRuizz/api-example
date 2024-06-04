import { Injectable } from '@nestjs/common';
import { HttpRoutesService } from '../http-routes/http-routes.service';
import { EntitiesConfig } from 'src/infrastructure/persistence/Sqlite/config/EntitiesConfig';
import { InjectModel } from '@nestjs/sequelize';
import { HttpRoutesDTO } from '../../DTO/inner/HttpRoutesDTO';
import { EnumDatabase } from '../../enums/EnumDatabase';
import { WhereOptions } from 'sequelize';

@Injectable()
export class EntitiesService {
  private currentHttpRoute: HttpRoutesDTO;
  private listHttpRoutes: HttpRoutesDTO[] = [];

  public constructor(
    @InjectModel(EntitiesConfig, EnumDatabase.mssqlConnection)
    private readonly exDbAPIEntities: typeof EntitiesConfig,
    private readonly httpRoutes: HttpRoutesService,
  ) {}

  public async syncHttpRoutes(): Promise<EntitiesConfig[]> {
    this.listHttpRoutes = this.httpRoutes.getRoutes();
    for (this.currentHttpRoute of this.listHttpRoutes) {
      const alreadyExits: boolean = await this.alreadyExits();
      if (!alreadyExits) {
        await this.createEndPoint();
      }
    }
    return await this.exDbAPIEntities.findAll();
  }

  private async createEndPoint() {
    try {
      const entity = {
        entityName: this.currentHttpRoute.entityName,
        entityRoute: this.currentHttpRoute.path,
        entityMethod: this.currentHttpRoute.method,
        concatenatedEndPoint: this.getEndPointAddress(),
      };
      await this.exDbAPIEntities.create(entity);
    } catch (error) {
      console.log('ERROR: createEndPoint()');
    }
  }

  private async alreadyExits(): Promise<boolean> {
    const exitingEndPoint = await this.findByExpression({
      concatenatedEndPoint: this.getEndPointAddress(),
    });
    return !!exitingEndPoint;
  }

  private getEndPointAddress(): any {
    return [
      `[${this.currentHttpRoute.entityName}]`,
      `[${this.currentHttpRoute.path}]`,
      `[${this.currentHttpRoute.method}]`,
    ].join('-');
  }

  public async getAll(): Promise<EntitiesConfig[]> {
    return this.exDbAPIEntities.findAll();
  }

  public async findByExpression(where: WhereOptions): Promise<object[]> {
    return this.exDbAPIEntities.findAll({ where });
  }
}
