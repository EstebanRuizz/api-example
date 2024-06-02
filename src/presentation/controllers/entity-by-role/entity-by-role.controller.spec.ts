import { Test, TestingModule } from '@nestjs/testing';
import { EntityByRoleController } from './entity-by-role.controller';

describe('EntityByRoleController', () => {
  let controller: EntityByRoleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EntityByRoleController],
    }).compile();

    controller = module.get<EntityByRoleController>(EntityByRoleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
