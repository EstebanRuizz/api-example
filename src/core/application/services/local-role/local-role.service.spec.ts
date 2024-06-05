import { Test, TestingModule } from '@nestjs/testing';
import { LocalRoleService } from './local-role.service';

describe('LocalRoleService', () => {
  let service: LocalRoleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LocalRoleService],
    }).compile();

    service = module.get<LocalRoleService>(LocalRoleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
