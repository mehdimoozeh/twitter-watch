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

  async totalTweets(twitterHandle: string): Promise<number> {
    const regex = new RegExp(twitterHandle, 'i'); // handle case sensitivity
    return await this.tweetModel.countDocuments({
      username: { $regex: regex },
    });
  }

  async tweets(
    twitterHandle: string,
    page: number,
    tweetLimit: number,
    repliesLimit: number,
  ): Promise<Tweet[]> {
    const skip = this.skip(page, tweetLimit);
    const regex = new RegExp(twitterHandle, 'i'); // handle case sensitivity
    const tweets = await this.tweetModel.aggregate([
      // Match tweets from a specific user
      {
        $match: { username: { $regex: regex } },
      },
      // Lookup the replies based on inReplyToTweetId field
      {
        $lookup: {
          from: 'tweets',
          localField: 'id',
          foreignField: 'inReplyToTweetId',
          as: 'replies',
        },
      },
      {
        $project: {
          _id: 1,
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
          replies: { $slice: ['$replies', repliesLimit] },
        },
      },
      {
        $project: {
          _id: 1,
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
          'replies.username': 1,
          'replies.rawContent': 1,
          'replies.date': 1,
        },
      },
    ]);
    return tweets;
  }

  audience(twitterHandle: string): string {
    return `audience of ${twitterHandle}`;
  }

  sentiment(twitterHandle: string): string {
    return `sentiment of ${twitterHandle}`;
  }
}
