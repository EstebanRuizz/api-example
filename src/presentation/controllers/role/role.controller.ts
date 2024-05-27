import { RolesService } from './../../../core/application/services/roles/roles.service';
import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { RoleDTO } from 'src/core/application/DTO/RoleDTO';
import { Role } from 'src/core/domain/models/Role';

@Controller('role')
export class RoleController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  public async getAll(): Promise<Role[]> {
    return this.rolesService.getAll();
  }

  @Get(':id')
  public async findOne(@Param('id') id: string): Promise<Role> {
    return this.rolesService.findOne(id);
  }

  @Post()
  public async create(@Body() roleDTO: RoleDTO): Promise<Role> {
    return this.rolesService.create(roleDTO);
  }

  @Delete(':id')
  public async remove(@Param('id') id: string): Promise<void> {
    return this.rolesService.remove(id);
  }
}
