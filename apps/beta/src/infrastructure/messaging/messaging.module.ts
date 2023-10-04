import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RabbitPublisher } from './publishers';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'INVENTORY',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_HOST],
          queue: 'inventory_queue',
          queueOptions: { durable: false },
        },
      },
    ]),
  ],
  controllers: [],
  providers: [RabbitPublisher],
  exports: [RabbitPublisher],
})
export class MessagingModule {}
