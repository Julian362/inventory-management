import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { InventoryGateway } from './infrastructure/gateway/inventory.gateway';
import { ProxyService } from './proxy.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join(
        process.cwd(),
        'environments',
        `.env.${process.env.SCOPE?.trimEnd()}`,
      ),
    }),
    RabbitMQModule.forRoot(RabbitMQModule, {
      uri: process.env.RABBITMQ_HOST || 'amqp://root:password@localhost:5672',
      connectionInitOptions: { wait: false },
    }),
  ],
  controllers: [],
  providers: [ProxyService, InventoryGateway],
})
export class ProxyModule {}
