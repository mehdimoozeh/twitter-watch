import { Injectable } from '@nestjs/common';
import { User } from './model/user.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tweet } from './model/tweet.model';

@Injectable()
export class TwitterWatchService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Tweet.name) private readonly tweetModel: Model<Tweet>,
  ) {}

  private skip(page: number, limit: number): number {
    return (page - 1) * limit;
  }

  async totalAccounts(): Promise<number> {
    return await this.userModel.countDocuments();
  }

  async accounts(page: number, limit: number): Promise<User[]> {
    const skip = this.skip(page, limit);
    const accounts = await this.userModel
      .find({}, { _id: 0 })
      .skip(skip)
      .limit(limit);
    return accounts;
  }

  async totalTweets(twitterhandle: string): Promise<number> {
    return await this.tweetModel.countDocuments({ username: twitterhandle });
  }

  async tweets(
    twitterHandle: string,
    page: number,
    limit: number,
  ): Promise<Tweet[]> {
    const skip = this.skip(page, limit);
    const regex = new RegExp(twitterHandle, 'i'); // handle case sensitivity
    const tweets = await this.tweetModel
      .find(
        { username: { $regex: regex } },
        {
          _id: 0,
          id: 1,
          date: 1,
          inReplyToTweetId: 1,
          lang: 1,
          likeCount: 1,
          quoteCount: 1,
          rawContent: 1,
          replyCount: 1,
          retweetCount: 1,
          url: 1,
          username: 1,
          viewCount: 1,
        },
      )
      .skip(skip)
      .limit(limit);
    return tweets;
  }

  audience(twitterHandle: string): string {
    return `audience of ${twitterHandle}`;
  }

  sentiment(twitterHandle: string): string {
    return `sentiment of ${twitterHandle}`;
  }
}
