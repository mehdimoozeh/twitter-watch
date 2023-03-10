import { Module } from '@nestjs/common';
import { TwitterWatchController } from './twitter-watch.controller';
import { TwitterWatchService } from './twitter-watch.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Tweet, TweetSchema } from './model/tweet.model';
import { User, UserSchema } from './model/user.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Tweet.name, schema: TweetSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [TwitterWatchController],
  providers: [TwitterWatchService],
})
export class TwitterWatchModule {}
