import { Controller, Get, Param, Query } from '@nestjs/common';
import { TwitterWatchService } from './twitter-watch.service';
import { ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AccountsResponseDto } from './dtos/accounts-response.dto';
import { TweetsResponseDto } from './dtos/tweets-response.dto';
import { AudienceResponseDto } from './dtos/audience-response.dto';

interface Result {
  result: string;
}

@ApiTags('Endpoints')
@Controller()
export class TwitterWatchController {
  constructor(private readonly twitterWatchService: TwitterWatchService) {}

  @Get('/accounts:page')
  @ApiQuery({ name: 'page', required: true, example: 1 })
  @ApiResponse({ type: [AccountsResponseDto] })
  async accounts(@Query() query): Promise<AccountsResponseDto> {
    const { page } = query;
    const pagination = +page || 1;
    const accounts = await this.twitterWatchService.accounts(pagination, 100);
    const totalAccounts = await this.twitterWatchService.totalAccounts();
    return {
      total: totalAccounts,
      page,
      accounts,
    };
  }

  @Get('/tweets/:handle')
  @ApiParam({ name: 'handle', required: true, example: 'alikarimi_ak8' })
  @ApiQuery({ name: 'page', required: true, example: 1 })
  @ApiQuery({ name: 'repliesLimit', required: true, example: 50 })
  @ApiResponse({ type: TweetsResponseDto })
  async tweets(
    @Param('handle') twitterHandle: string,
    @Query() query,
  ): Promise<TweetsResponseDto> {
    const { page, repliesLimit } = query;
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

  @Get('/audience/:handle')
  @ApiResponse({ type: [AudienceResponseDto] })
  async audience(@Query('handle') twitterHandle: string) {
    return await this.twitterWatchService.audience(twitterHandle);
  }

  // TODO:
  @Get('/sentiment/:handle')
  sentiment(@Query('handle') twitterHandle: string): Result {
    return {
      result: this.twitterWatchService.sentiment(twitterHandle),
    };
  }
}
