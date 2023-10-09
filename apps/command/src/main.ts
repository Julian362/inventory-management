import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { CommandModule } from './command.module';

async function bootstrap() {
  const app = await NestFactory.create(CommandModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  await app.startAllMicroservices();
  await app.listen(3000);
  console.log(`🚀 Application is running on: ${await app.getUrl()}`);
}
bootstrap();
