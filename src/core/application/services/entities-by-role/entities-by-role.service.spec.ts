import { Test, TestingModule } from '@nestjs/testing';
import { EntitiesByRoleService } from './entities-by-role.service';

describe('EntitiesByRoleService', () => {
  let service: EntitiesByRoleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EntitiesByRoleService],
    }).compile();

    service = module.get<EntitiesByRoleService>(EntitiesByRoleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
