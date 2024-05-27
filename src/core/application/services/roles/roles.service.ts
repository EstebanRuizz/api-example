import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from '../../../domain/models/Role';
import { RoleDTO } from '../../DTO/RoleDTO';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Role)
    private roleModel: typeof Role,
  ) {}

  public async getAll(): Promise<Role[]> {
    return this.roleModel.findAll();
  }

  public async findOne(id: string): Promise<Role> {
    return this.roleModel.findByPk(id);
  }

  public async remove(id: string): Promise<void> {
    const role = await this.findOne(id);
    if (role) {
      await role.destroy();
    }
  }

  public async create(roleDTO: RoleDTO): Promise<Role> {
    const role: Role = this.roleModel.build({
      name: roleDTO.name,
      description: roleDTO.description,
    });
    return role.save();
  }
}
