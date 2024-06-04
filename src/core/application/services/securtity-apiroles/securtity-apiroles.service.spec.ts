import { Test, TestingModule } from '@nestjs/testing';
import { SecurtityApirolesService } from './security-apiroles.service';

describe('SecurtityApirolesService', () => {
  let service: SecurtityApirolesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SecurtityApirolesService],
    }).compile();

    service = module.get<SecurtityApirolesService>(SecurtityApirolesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
