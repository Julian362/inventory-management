import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { BetaModule } from './beta.module';

async function bootstrap() {
  const app = await NestFactory.create(BetaModule);
  app.useGlobalPipes(new ValidationPipe());
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://root:password@localhost:5672'],
      queue: 'inventory_queue',
      queueOptions: {
        durable: false,
      },
    },
  });
  await app.startAllMicroservices();
  await app.listen(3001);
  console.log(`🚀 Application is running on: ${await app.getUrl()}`);
}
bootstrap();
