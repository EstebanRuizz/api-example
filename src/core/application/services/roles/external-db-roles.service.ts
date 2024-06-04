import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RoleDTO } from '../../DTO/RoleDTO';
import { RoleConfig } from 'src/infrastructure/persistence/Sqlite/config/RoleConfig';
import { EnumDatabase } from '../../enums/EnumDatabase';
import { WhereOptions } from 'sequelize';

@Injectable()
export class ExternalDBRolesService {
  public constructor(
    @InjectModel(RoleConfig, EnumDatabase.mssqlConnection)
    private readonly extDBBRole: typeof RoleConfig,
  ) {}

  public async getAll(): Promise<RoleConfig[]> {
    return this.extDBBRole.findAll();
  }

  public async findOne(id: string): Promise<RoleConfig> {
    return this.extDBBRole.findByPk(id);
  }

  public async findBy(where: WhereOptions): Promise<RoleConfig | null> {
    return this.extDBBRole.findOne({ where });
  }

  public async remove(id: string): Promise<void> {
    const role = await this.findOne(id);
    if (role) {
      await role.destroy();
    }
  }

  public async create(roleDTO: RoleDTO): Promise<RoleConfig> {
    const role: RoleConfig = this.extDBBRole.build({
      name: roleDTO.name,
      description: roleDTO.description,
    });
    return role.save();
  }
}
