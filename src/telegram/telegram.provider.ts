import { ConfigService } from '@nestjs/config';
import { TelegramClient } from 'telegram';
import { StringSession } from 'telegram/sessions';

export const telegramProviders = [
  {
    provide: 'TELEGRAM_CLIENT',
    useFactory: (configService: ConfigService) => {
      const telegramSession = configService.get('TELEGRAM_SESSION', '');
      const stringSession = new StringSession(telegramSession);

      const apiId = +configService.get<number>('TELEGRAM_API_ID');
      const apiHash = configService.get('TELEGRAM_API_HASH_ID');

      return new TelegramClient(stringSession, apiId, apiHash, {
        connectionRetries: 5,
      });
    },
    inject: [ConfigService],
  },
];
