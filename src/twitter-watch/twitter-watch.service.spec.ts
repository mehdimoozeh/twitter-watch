import { Test, TestingModule } from '@nestjs/testing';
import { TwitterWatchService } from './twitter-watch.service';

describe('TwitterWatchService', () => {
  let service: TwitterWatchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TwitterWatchService],
    }).compile();

    service = module.get<TwitterWatchService>(TwitterWatchService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
