import { Test, TestingModule } from '@nestjs/testing';
import { LocalUserJwtsessionService } from './local-user-jwtsession.service';

describe('LocalUserJwtsessionService', () => {
  let service: LocalUserJwtsessionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LocalUserJwtsessionService],
    }).compile();

    service = module.get<LocalUserJwtsessionService>(LocalUserJwtsessionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
