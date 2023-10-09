import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { QuerieModule } from './querie.module';

async function bootstrap() {
  const app = await NestFactory.create(QuerieModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  await app.startAllMicroservices();
  await app.listen(3001);
  console.log(`🚀 Application is running on: ${await app.getUrl()}`);
}
bootstrap();
