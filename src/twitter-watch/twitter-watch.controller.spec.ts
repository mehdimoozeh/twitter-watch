import { Test, TestingModule } from '@nestjs/testing';
import { TwitterWatchController } from './twitter-watch.controller';

describe('TwitterWatchController', () => {
  let controller: TwitterWatchController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TwitterWatchController],
    }).compile();

    controller = module.get<TwitterWatchController>(TwitterWatchController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
