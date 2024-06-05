import { Test, TestingModule } from '@nestjs/testing';
import { LocalEntitiesService } from './local-entities.service';

describe('LocalEntitiesService', () => {
  let service: LocalEntitiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LocalEntitiesService],
    }).compile();

    service = module.get<LocalEntitiesService>(LocalEntitiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
