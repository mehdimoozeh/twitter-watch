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

  private tweetsProjection = {
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
  };

  async tweets(
    twitterHandle: string,
    page: number,
    tweetLimit: number,
    repliesLimit: number,
  ): Promise<Tweet[]> {
    const skip = this.skip(page, tweetLimit);
    const regex = new RegExp(twitterHandle, 'i'); // handle case sensitivity
    const tweets = await this.tweetModel.aggregate([
      { $match: { username: { $regex: regex } } },
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
          ...this.tweetsProjection,
          replies: { $slice: ['$replies', repliesLimit] },
        },
      },
      {
        $project: {
          ...this.tweetsProjection,
          'replies.username': 1,
          'replies.rawContent': 1,
          'replies.date': 1,
        },
      },
    ]);
    return tweets;
  }

  async audience(twitterHandle: string): Promise<User[]> {
    const regex = new RegExp(twitterHandle, 'i'); // handle case sensitivity
    const repliersOfRecentTweets = await this.tweetModel.aggregate([
      {
        $match: {
          username: { $regex: regex },
          inReplyToTweetId: null,
        },
      },
      { $sort: { date: -1 } },
      { $limit: 5 },
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
          conversationId: 1,
          'replies.username': 1,
        },
      },
    ]);
    if (repliersOfRecentTweets.length === 0) return [];

    const audiences = this.findMostActiveUsers(repliersOfRecentTweets);
    const usernames = Object.keys(audiences);

    const result = await this.userModel.find(
      { username: { $in: usernames } },
      { _id: 0 },
    );

    return result.map((user) =>
      Object.assign(user.toObject(), {
        recentRepliesCount: audiences[user.username],
      }),
    );
  }

  private findMostActiveUsers(recentTweets): Record<string, number> {
    const repliers = {} as Record<string, number>;
    recentTweets.forEach((tweet) => {
      tweet.replies.forEach((replier) => {
        if (repliers[replier.username]) {
          repliers[replier.username]++;
        } else {
          repliers[replier.username] = 1;
        }
      });
    });
    const result = Object.entries(repliers);
    result.sort((a, b) => b[1] - a[1]);
    return Object.fromEntries(result.slice(0, 10));
  }

  sentiment(twitterHandle: string): string {
    return `sentiment of ${twitterHandle}`;
  }
}
