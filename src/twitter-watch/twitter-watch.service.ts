import { Injectable } from '@nestjs/common';

@Injectable()
export class TwitterWatchService {
  accounts(): string[] {
    const accounts = ['@alikarimi_ak8', '@elonmusk', '@BarackObama'];
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
