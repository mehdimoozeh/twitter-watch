import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from './user.model';

@Schema({ versionKey: false, timestamps: false })
export class Tweet {
  _id: string;

  @Prop()
  id: number;

  @Prop()
  conversationId: number;

  @Prop()
  date: Date;

  @Prop()
  inReplyToTweetId: number;

  @Prop({ type: User })
  inReplyToUser: User;

  @Prop()
  lang: string;

  @Prop()
  likeCount: number;

  @Prop()
  quoteCount: number;

  @Prop()
  quotedTweet: string;

  @Prop()
  rawContent: string;

  @Prop()
  renderedContent: string;

  @Prop()
  replyCount: number;

  @Prop()
  retweetCount: number;

  @Prop()
  url: string;

  @Prop({ type: User })
  user: User;

  @Prop()
  username: string;

  @Prop()
  viewCount: number;
}

export const TweetSchema = SchemaFactory.createForClass(Tweet);
