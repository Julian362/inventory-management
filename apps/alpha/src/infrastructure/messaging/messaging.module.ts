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
          urls: ['amqp://root:password@localhost:5672'],
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
