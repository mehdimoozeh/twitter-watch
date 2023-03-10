import { Controller, Get, Query } from '@nestjs/common';
import { TwitterWatchService } from './twitter-watch.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AccountsResponseDto } from './dtos/accounts-response.dto';
import { TweetsResponseDto } from './dtos/tweets-response.dto';

interface Result {
  result: string;
}

@ApiTags('Endpoints')
@Controller()
export class TwitterWatchController {
  constructor(private readonly twitterWatchService: TwitterWatchService) {}

  @Get('/accounts')
  @ApiResponse({ type: [AccountsResponseDto] })
  async accounts(
    @Query('pagination') pagination: string,
  ): Promise<AccountsResponseDto> {
    const page = Number.parseInt(pagination) || 1;
    const accounts = await this.twitterWatchService.accounts(page, 100);
    const totalAccounts = await this.twitterWatchService.totalAccounts();
    return {
      total: totalAccounts,
      page,
      accounts,
    };
  }

  // TODO: add validation
  @Get('/tweets/:twitter-handle')
  async tweets(
    @Query('twitter-handle') twitterHandle: string,
    @Query('pagination') pagination: string,
  ): Promise<TweetsResponseDto> {
    const page = Number.parseInt(pagination) || 1;
    const tweets = await this.twitterWatchService.tweets(
      twitterHandle,
      page,
      100,
    );
    const totalTweets = await this.twitterWatchService.totalTweets(
      twitterHandle,
    );
    return {
      total: totalTweets,
      page,
      tweets,
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
