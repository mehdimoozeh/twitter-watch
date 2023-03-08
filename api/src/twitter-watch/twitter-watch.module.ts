import { Module } from '@nestjs/common';
import { TwitterWatchController } from './twitter-watch.controller';
import { TwitterWatchService } from './twitter-watch.service';

@Module({
  controllers: [TwitterWatchController],
  providers: [TwitterWatchService],
})
export class TwitterWatchModule {}
