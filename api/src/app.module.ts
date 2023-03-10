import { Module } from '@nestjs/common';
import { HealthController } from './healthController';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TwitterWatchModule } from './twitter-watch/twitter-watch.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('MONGO_URI'),
        useNewUrlParser: true,
      }),
      inject: [ConfigService],
    }),
    TwitterWatchModule,
  ],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}
