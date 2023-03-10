import { ApiProperty } from '@nestjs/swagger';
import { Prop } from '@nestjs/mongoose';

export class TweetDto {
  @Prop()
  date: Date;

  @Prop()
  inReplyToTweetId: number;

  @Prop()
  lang: string;

  @Prop()
  likeCount: number;

  @Prop()
  quoteCount: number;

  @Prop()
  rawContent: string;

  @Prop()
  replyCount: number;

  @Prop()
  retweetCount: number;

  @Prop()
  url: string;

  @Prop()
  username: string;

  @Prop()
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
