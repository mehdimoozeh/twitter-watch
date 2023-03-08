import { Module } from '@nestjs/common';
import { HealthController } from './healthController';
import { ConfigModule } from '@nestjs/config';
import { TwitterWatchModule } from './twitter-watch/twitter-watch.module';

@Module({
  imports: [ConfigModule.forRoot(), TwitterWatchModule],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}
