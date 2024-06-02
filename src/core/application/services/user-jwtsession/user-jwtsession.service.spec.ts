import { Test, TestingModule } from '@nestjs/testing';
import { UserJwtsessionService } from './user-jwtsession.service';

describe('UserJwtsessionService', () => {
  let service: UserJwtsessionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserJwtsessionService],
    }).compile();

    service = module.get<UserJwtsessionService>(UserJwtsessionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
