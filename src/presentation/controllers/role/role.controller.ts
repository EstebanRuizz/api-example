import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { RoleDTO } from 'src/core/application/DTO/RoleDTO';
import { RoleConfig } from '../../../infrastructure/persistence/Sqlite/config/RoleConfig';
import { ExternalDBRolesService } from 'src/core/application/services/roles/external-db-roles.service';

@Controller('role')
export class RoleController {
  constructor(private readonly externalDBRoles: ExternalDBRolesService) {}

  @Get()
  public async getAll(): Promise<RoleConfig[]> {
    return this.externalDBRoles.getAll();
  }

  @Get(':id')
  public async findOne(@Param('id') id: string): Promise<RoleConfig> {
    return this.externalDBRoles.findOne(id);
  }

  @Post()
  public async create(@Body() roleDTO: RoleDTO): Promise<RoleConfig> {
    return this.externalDBRoles.create(roleDTO);
  }

  @Delete(':id')
  public async remove(@Param('id') id: string): Promise<void> {
    return this.externalDBRoles.remove(id);
  }
}
