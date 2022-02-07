import { Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { ConfigModule } from '@nestjs/config';
import { telegramProviders } from './telegram.provider';

@Module({
  imports: [ConfigModule],
  providers: [TelegramService, ...telegramProviders],
  exports: [TelegramService],
})
export class TelegramModule {}
