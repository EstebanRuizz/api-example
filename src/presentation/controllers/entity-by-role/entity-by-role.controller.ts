import { Controller } from '@nestjs/common';
import { Get, Post, Param, Delete, Body } from '@nestjs/common';
import { EntitiesByRoleService } from './../../../core/application/services/entities-by-role/entities-by-role.service';
import { EntitiesByRoleConfig } from '../../../infrastructure/persistence/Sqlite/config/EntitiesByRoleConfig';
import { EntitiesByRoleDTO } from 'src/core/application/DTO/EntitiesByRole';

@Controller('entity-by-role')
export class EntityByRoleController {
  constructor(private readonly entityByRoleService: EntitiesByRoleService) {}

  @Get()
  public async getAll(): Promise<EntitiesByRoleConfig[]> {
    return this.entityByRoleService.getAll();
  }

  @Get(':id')
  public async findOne(@Param('id') id: string): Promise<EntitiesByRoleConfig> {
    return this.entityByRoleService.findOne(id);
  }

  @Post()
  public async create(
    @Body() entitiesByRoleDTO: EntitiesByRoleDTO,
  ): Promise<EntitiesByRoleConfig> {
    return this.entityByRoleService.create(entitiesByRoleDTO);
  }

  @Delete(':id')
  public async remove(@Param('id') id: string): Promise<void> {
    return this.entityByRoleService.remove(id);
  }
}
