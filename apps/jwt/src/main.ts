import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { JWTModule } from './jwt.module';

async function bootstrap() {
  const app = await NestFactory.create(JWTModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  await app.startAllMicroservices();
  await app.listen(3003);
  console.log(`🚀 Application is running on: ${await app.getUrl()}`);
}
bootstrap();
