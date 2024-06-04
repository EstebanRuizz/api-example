import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RoleDTO } from '../../DTO/RoleDTO';
import { RoleConfig } from 'src/infrastructure/persistence/Sqlite/config/RoleConfig';

@Injectable()
export class RolesService {
  public constructor(
    @InjectModel(RoleConfig, 'sqliteConnection')
    private readonly roleModel: typeof RoleConfig,
  ) {}

  public async getAll(): Promise<RoleConfig[]> {
    return this.roleModel.findAll();
  }

  public async findOne(id: string): Promise<RoleConfig> {
    return this.roleModel.findByPk(id);
  }

  public async remove(id: string): Promise<void> {
    const role = await this.findOne(id);
    if (role) {
      await role.destroy();
    }
  }

  public async create(roleDTO: RoleDTO): Promise<RoleConfig> {
    const role: RoleConfig = this.roleModel.build({
      name: roleDTO.name,
      description: roleDTO.description,
    });
    return role.save();
  }
}
