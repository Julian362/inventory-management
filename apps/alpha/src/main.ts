import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AlphaModule } from './alpha.module';

async function bootstrap() {
  const app = await NestFactory.create(AlphaModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.startAllMicroservices();
  await app.listen(3000);
  console.log(`🚀 Application is running on: ${await app.getUrl()}`);
}
bootstrap();
