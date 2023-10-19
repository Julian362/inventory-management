import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { CommandModule } from './command.module';

async function bootstrap() {
  const app = await NestFactory.create(CommandModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Command API')
    .setVersion('1.0')
    .addTag('Command')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.startAllMicroservices();
  await app.listen(3000);
  console.log(`🚀 Application is running on: ${await app.getUrl()}`);
  console.log(`🚀 Swagger: ${await app.getUrl()}/api`);
}
bootstrap();
