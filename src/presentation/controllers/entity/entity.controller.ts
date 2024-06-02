import { Controller, Get } from '@nestjs/common';
import { EntitiesService } from '../../../core/application/services/entities/entities.service';
import { EntitiesConfig } from 'src/infrastructure/persistence/Sqlite/config/EntitiesConfig';

@Controller('entity')
export class EntityController {
  constructor(private readonly entitiesService: EntitiesService) {}

  @Get()
  public async getAll(): Promise<EntitiesConfig[]> {
    return await this.entitiesService.getAll();
  }
}
