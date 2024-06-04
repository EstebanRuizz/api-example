import { EntitiesByRoleDTO } from './../../DTO/EntitiesByRole';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { EntitiesByRoleConfig } from 'src/infrastructure/persistence/Sqlite/config/EntitiesByRoleConfig';
import { EnumDatabase } from '../../enums/EnumDatabase';
import { WhereOptions } from 'sequelize';
import { EntitiesConfig } from 'src/infrastructure/persistence/Sqlite/config/EntitiesConfig';

@Injectable()
export class EntitiesByRoleService {
  constructor(
    @InjectModel(EntitiesByRoleConfig, EnumDatabase.mssqlConnection)
    private readonly entitiesByRoleConfig: typeof EntitiesByRoleConfig,
    @InjectModel(EntitiesConfig, EnumDatabase.mssqlConnection)
    private readonly entitiesConfig: typeof EntitiesConfig,
  ) {}

  async getAll(): Promise<EntitiesByRoleConfig[]> {
    return this.entitiesByRoleConfig.findAll();
  }

  public async findOne(id: string): Promise<EntitiesByRoleConfig> {
    return await this.entitiesByRoleConfig.findByPk(id);
  }

  public async create(
    entitiesByRoleDTO: EntitiesByRoleDTO,
  ): Promise<EntitiesByRoleConfig> {
    const entitiesByRole = this.entitiesByRoleConfig.build({
      roleFK: entitiesByRoleDTO.roleFK,
      entityFK: entitiesByRoleDTO.entityFK,
    });
    return entitiesByRole.save();
  }

  public async bulkCreate(
    entitiesByRoleDTOs: EntitiesByRoleDTO[],
  ): Promise<EntitiesByRoleConfig[]> {
    const entitiesToCreate = entitiesByRoleDTOs.map((dto) => ({
      roleFK: dto.roleFK,
      entityFK: dto.entityFK,
    }));

    return this.entitiesByRoleConfig.bulkCreate(entitiesToCreate);
  }

  remove(id: string): void | PromiseLike<void> {
    this.entitiesByRoleConfig.destroy({
      where: {
        id: id,
      },
    });
  }

  public async findByExpression(where: WhereOptions): Promise<object[]> {
    return this.entitiesByRoleConfig.findAll({ where });
  }
}
