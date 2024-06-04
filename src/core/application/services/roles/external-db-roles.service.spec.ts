import { Test, TestingModule } from '@nestjs/testing';
import { ExternalDBRolesService } from './external-db-roles.service';

describe('ExternalDBRolesService', () => {
  let service: ExternalDBRolesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExternalDBRolesService],
    }).compile();

    service = module.get<ExternalDBRolesService>(ExternalDBRolesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
