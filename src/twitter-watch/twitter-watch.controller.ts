import { Controller, Get, Query } from '@nestjs/common';
import { TwitterWatchService } from './twitter-watch.service';
import { ApiTags } from '@nestjs/swagger';

interface Result {
  result: string;
}

@ApiTags('Endpoints')
@Controller()
export class TwitterWatchController {
  constructor(private readonly twitterWatchService: TwitterWatchService) {}

  @Get('/accounts')
  accounts(): string[] {
    return this.twitterWatchService.accounts();
  }

  // TODO: add validation
  @Get('/tweets/:twitter-handle')
  tweets(@Query('twitter-handle') twitterHandle: string): Result {
    return {
      result: this.twitterWatchService.tweets(twitterHandle),
    };
  }

  // TODO: add validation
  @Get('/audience/:twitter-handle')
  audience(@Query('twitter-handle') twitterHandle: string): Result {
    return {
      result: this.twitterWatchService.audience(twitterHandle),
    };
  }

  // TODO: add validation
  @Get('/sentiment/:twitter-handle')
  sentiment(@Query('twitter-handle') twitterHandle: string): Result {
    return {
      result: this.twitterWatchService.sentiment(twitterHandle),
    };
  }
}
