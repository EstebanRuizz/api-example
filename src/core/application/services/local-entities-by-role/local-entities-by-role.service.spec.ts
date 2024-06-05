import { Test, TestingModule } from '@nestjs/testing';
import { LocalEntitiesByRoleService } from './local-entities-by-role.service';

describe('LocalEntitiesByRoleService', () => {
  let service: LocalEntitiesByRoleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LocalEntitiesByRoleService],
    }).compile();

    service = module.get<LocalEntitiesByRoleService>(LocalEntitiesByRoleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
