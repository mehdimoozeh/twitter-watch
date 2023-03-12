import { ApiProperty } from '@nestjs/swagger';
import { Prop } from '@nestjs/mongoose';

export class TweetDto {
  @ApiProperty()
  date: Date;

  @ApiProperty()
  inReplyToTweetId: number;

  @ApiProperty()
  lang: string;

  @ApiProperty()
  likeCount: number;

  @ApiProperty()
  quoteCount: number;

  @ApiProperty()
  rawContent: string;

  @ApiProperty()
  replyCount: number;

  @ApiProperty()
  retweetCount: number;

  @ApiProperty()
  url: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  viewCount: number;
}

export class TweetsResponseDto {
  @ApiProperty()
  page: number;

  @ApiProperty()
  total: number;

  @ApiProperty({ type: [TweetDto] })
  tweets: TweetDto[];
}
