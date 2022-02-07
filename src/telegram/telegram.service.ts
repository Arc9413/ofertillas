import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Api, TelegramClient } from 'telegram';
import * as input from 'input';
import { shouldSendMessage } from '../util/message-util';
import { splitString } from '../util/string-util';
import { NewMessage, NewMessageEvent } from 'telegram/events';

@Injectable()
export class TelegramService implements OnModuleInit {
  private readonly logger = new Logger(TelegramService.name);

  constructor(
    @Inject('TELEGRAM_CLIENT') private readonly telegramClient: TelegramClient,
    private readonly configService: ConfigService,
  ) {}

  async onModuleInit(): Promise<void> {
    await this.telegramClient.start({
      phoneNumber: async () => await input.text('Please enter your number: '),
      password: async () => await input.text('Please enter your password: '),
      phoneCode: async () => await input.text('Please enter the code you received: '),
      onError: (err) => console.log(err),
    });

    this.logger.log('You should now be connected.');
    this.logger.log(this.telegramClient.session.save());
    await this.telegramClient.sendMessage('me', {
      message: 'Logged! store the previous token and set it as env param',
    });

    if (this.configService.get('TELEGRAM_LISTEN_CHANNEL_ENABLED') === 'true') {
      const listenChannelId = this.configService.get('TELEGRAM_LISTEN_CHANNEL');
      const forwardTo = this.configService.get('TELEGRAM_FORWARD_TO');

      const filterRanks = splitString(this.configService.get('TELEGRAM_FILTER_RANK'), ',');
      const filterWords = splitString(this.configService.get('TELEGRAM_FILTER_WORD'), ',');
      const filterStores = splitString(this.configService.get('TELEGRAM_FILTER_STORE'), ',');

      const filterFn = (s) => shouldSendMessage(s, filterRanks, filterWords, filterStores);

      this.logger.log(`Adding handler for chat id ${listenChannelId}`);

      this.telegramClient.addEventHandler(async (event: NewMessageEvent) => {
        await this.forwardMessageTo(event.message, forwardTo, filterFn);
      }, new NewMessage({ chats: [listenChannelId] }));
    }
  }

  forwardMessageTo = async (message: Api.Message, toChat: string, shouldSend?: (s: string) => boolean) => {
    this.logger.log(`Received new message event ${JSON.stringify(message)}`);

    if (typeof shouldSend === 'function' && !shouldSend(message.message)) {
      return;
    }

    const response = await message.forwardTo(toChat);

    this.logger.log(`Message forwarded to ${toChat}`);
    return response;
  };
}
