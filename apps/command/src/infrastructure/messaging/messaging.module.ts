import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { EXCHANGE } from '@shared/const';
import { RabbitPublisher } from './publishers';

@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, {
      name: 'RABBITMQ_CONNECTION',
      exchanges: [
        {
          name: EXCHANGE,
          type: 'topic',
          createExchangeIfNotExists: true,
        },
      ],
      uri: process.env.RABBITMQ_HOST || 'amqp://root:password@localhost:5672',
      connectionInitOptions: { wait: false },
    }),
  ],
  controllers: [],
  providers: [RabbitPublisher],
  exports: [RabbitPublisher],
})
export class MessagingModule {}
