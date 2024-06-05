import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { EnumDatabase } from '../../../enums/EnumDatabase';
import { PaginationDTO } from '../../../DTO/inner/PaginationDTO';
import { IRepositoryAsync } from '../../../interface/IRepositoryAsync';
import { CreateEntitiesDTO } from '../../../DTO/inner/LocalEntities/CreateEntitiesDTO';
import { UpdateEntitiesDTO } from '../../../DTO/inner/LocalEntities/UpdateEntitiesDTO';
import { LocalEntities } from 'src/infrastructure/persistence/Sqlite/config/LocalEntities';
import { HttpRoutesDTO } from '../../../DTO/inner/HttpRoutesDTO';

@Injectable()
export class LocalEntitiesService
  implements
    IRepositoryAsync<LocalEntities, CreateEntitiesDTO, UpdateEntitiesDTO>
{
  private currentHttpRoute: HttpRoutesDTO;
  constructor(
    @InjectModel(LocalEntities, EnumDatabase.sqliteConnection)
    private readonly entities: typeof LocalEntities,
  ) {}

  public async findAll(): Promise<LocalEntities[]> {
    return await this.entities.findAll();
  }

  public async findPaginated(
    pagination: PaginationDTO,
  ): Promise<LocalEntities[]> {
    const { page, pageSize } = pagination;
    const offset = (page - 1) * pageSize;
    const limit = pageSize;

    return await this.entities.findAll({
      limit,
      offset,
    });
  }

  public async findById(id: string): Promise<LocalEntities> {
    return await this.entities.findByPk(id);
  }
  public async update(
    id: string,
    tUpdateDTO: UpdateEntitiesDTO,
  ): Promise<LocalEntities> {
    const localEntities: LocalEntities = await this.entities.findByPk(id);
    if (localEntities) {
      await this.entities.update(tUpdateDTO, {
        where: { id },
      });
      return this.entities.findByPk(id);
    }
  }

  public async delete(id: string): Promise<LocalEntities> {
    const localEntities: LocalEntities = await this.entities.findByPk(id);
    if (localEntities) {
      await this.entities.destroy({
        where: { id },
      });
      return localEntities;
    }
  }

  public async create(tCreateDTO: CreateEntitiesDTO): Promise<LocalEntities> {
    const localEntities: LocalEntities = this.entities.build({
      entityName: tCreateDTO.entityName,
      entityRoute: tCreateDTO.entityRoute,
      entityMethod: tCreateDTO.entityMethod,
      concatenatedEndPoint: tCreateDTO.concatenatedEndPoint,
    });
    return await localEntities.save();
  }

  public async bulkCreate(
    entitiesList: CreateEntitiesDTO[],
  ): Promise<LocalEntities[]> {
    const localEntities: CreateEntitiesDTO[] = entitiesList.map(
      (entity: CreateEntitiesDTO) => ({
        entityName: entity.entityName,
        entityRoute: entity.entityRoute,
        entityMethod: entity.entityMethod,
        concatenatedEndPoint: entity.concatenatedEndPoint,
      }),
    );
    for (const entity of localEntities) {
      if (!(await this.alreadyExits(entity.concatenatedEndPoint))) {
        await this.create(entity);
      }
    }
    return this.entities.findAll();
  }

  private async alreadyExits(concatenatedEndPoint: string): Promise<boolean> {
    const exitingEndPoint = await this.entities.findOne({
      where: {
        concatenatedEndPoint: concatenatedEndPoint,
      },
    });

    return !!exitingEndPoint;
  }
}
