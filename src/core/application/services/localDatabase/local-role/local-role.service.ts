import { Injectable } from '@nestjs/common';
import { RoleDTO } from '../../../DTO/RoleDTO';
import { LocalRole } from 'src/infrastructure/persistence/Sqlite/config/LocalRole';
import { InjectModel } from '@nestjs/sequelize';
import { EnumDatabase } from '../../../enums/EnumDatabase';

@Injectable()
export class LocalRoleService {
  public constructor(
    @InjectModel(LocalRole, EnumDatabase.sqliteConnection)
    private readonly localRoleModel: typeof LocalRole,
  ) {}

  private role: LocalRole;

  public async create(roleDTO: RoleDTO): Promise<LocalRole> {
    this.role = await this.localRoleModel.findOne({
      where: {
        name: roleDTO.name,
      },
    });

    if (!this.role) {
      this.role = await this.localRoleModel.create(
        new RoleDTO(roleDTO.name, roleDTO.description),
      );
    }

    return this.role;
  }

  public async bulkCreate(role: RoleDTO[]): Promise<LocalRole[]> {
    const localRoles = role.map((e: RoleDTO) => ({
      name: e.name,
      description: e.description,
    }));

    return this.localRoleModel.bulkCreate(localRoles);
  }
}
