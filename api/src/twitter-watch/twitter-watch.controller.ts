import { Controller, Get, Param, Query } from '@nestjs/common';
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
  async accounts(@Param('page') page?: number): Promise<AccountsResponseDto> {
    const pagination = +page || 1;
    const accounts = await this.twitterWatchService.accounts(pagination, 100);
    const totalAccounts = await this.twitterWatchService.totalAccounts();
    return {
      total: totalAccounts,
      page,
      accounts,
    };
  }

  // TODO: add validation
  @Get('/tweets/:handle')
  async tweets(
    @Query('handle') twitterHandle: string,
    @Param('page') page?: number,
    @Param('repliesLimit') repliesLimit?: number,
  ): Promise<TweetsResponseDto> {
    const pagination = +page || 1;
    const replies = +repliesLimit || 50;
    const tweets = await this.twitterWatchService.tweets(
      twitterHandle,
      pagination,
      100,
      replies,
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
