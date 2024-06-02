import { EntitiesByRoleDTO } from './../../DTO/EntitiesByRole';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { EntitiesByRoleConfig } from 'src/infrastructure/persistence/Sqlite/config/EntitiesByRoleConfig';

@Injectable()
export class EntitiesByRoleService {
  constructor(
    @InjectModel(EntitiesByRoleConfig)
    private readonly entitiesByRoleConfig: typeof EntitiesByRoleConfig,
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
  
  remove(id: string): void | PromiseLike<void> {
    throw new Error('Method not implemented.');
  }
}
