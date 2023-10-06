import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { CommandModule } from './command.module';

async function bootstrap() {
  const app = await NestFactory.create(CommandModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.startAllMicroservices();
  app.enableCors();
  await app.listen(3000);
  console.log(`🚀 Application is running on: ${await app.getUrl()}`);
}
bootstrap();
