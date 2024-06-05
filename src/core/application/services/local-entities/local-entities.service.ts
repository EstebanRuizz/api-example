import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { EnumDatabase } from '../../enums/EnumDatabase';
import { PaginationDTO } from '../../DTO/inner/PaginationDTO';
import { IRepositoryAsync } from '../../interface/IRepositoryAsync';
import { CreateEntitiesDTO } from '../../DTO/inner/CreateEntitiesDTO';
import { UpdateEntitiesDTO } from '../../DTO/inner/UpdateEntitiesDTO';
import { EntitiesConfig } from 'src/infrastructure/persistence/Sqlite/config/EntitiesConfig';

@Injectable()
export class LocalEntitiesService
  implements
    IRepositoryAsync<EntitiesConfig, CreateEntitiesDTO, UpdateEntitiesDTO>
{
  constructor(
    @InjectModel(EntitiesConfig, EnumDatabase.sqliteConnection)
    private readonly entities: typeof EntitiesConfig,
  ) {}

  public async findAll(): Promise<EntitiesConfig[]> {
    return await this.entities.findAll();
  }

  public async findPaginated(
    pagination: PaginationDTO,
  ): Promise<EntitiesConfig[]> {
    const { page, pageSize } = pagination;
    const offset = (page - 1) * pageSize;
    const limit = pageSize;

    return await this.entities.findAll({
      limit,
      offset,
    });
  }

  public async findById(id: string): Promise<EntitiesConfig> {
    return await this.entities.findByPk(id);
  }
  public async update(
    id: string,
    tUpdateDTO: UpdateEntitiesDTO,
  ): Promise<EntitiesConfig> {
    const entitiesConfig: EntitiesConfig = await this.entities.findByPk(id);
    if (entitiesConfig) {
      await this.entities.update(tUpdateDTO, {
        where: { id },
      });
      return this.entities.findByPk(id);
    }
    throw new Error(`Entity with id ${id} not found`);
  }

  public async delete(id: string): Promise<EntitiesConfig> {
    const entitiesConfig: EntitiesConfig = await this.entities.findByPk(id);
    if (entitiesConfig) {
      await this.entities.destroy({
        where: { id },
      });
      return entitiesConfig;
    }
    throw new Error(`Entity with id ${id} not found`);
  }

  public async create(tCreateDTO: CreateEntitiesDTO): Promise<EntitiesConfig> {
    const entitiesConfig: EntitiesConfig = this.entities.build({
      entityName: tCreateDTO.entityName,
      entityRoute: tCreateDTO.entityRoute,
      entityMethod: tCreateDTO.entityMethod,
      concatenatedEndPoint: tCreateDTO.concatenatedEndPoint,
    });
    return await entitiesConfig.save();
  }
}
