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

  async totalAccounts(): Promise<number> {
    return await this.userModel.countDocuments();
  }

  async accounts(page: number, limit: number): Promise<User[]> {
    const skip = (page - 1) * limit;
    const accounts = await this.userModel
      .find({}, { _id: 0 })
      .skip(skip)
      .limit(limit);
    return accounts;
  }

  tweets(twitterHandle: string): string {
    return `tweets of ${twitterHandle}`;
  }

  audience(twitterHandle: string): string {
    return `audience of ${twitterHandle}`;
  }

  sentiment(twitterHandle: string): string {
    return `sentiment of ${twitterHandle}`;
  }
}
