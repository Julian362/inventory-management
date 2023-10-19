import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { QuerieModule } from './querie.module';

async function bootstrap() {
  const app = await NestFactory.create(QuerieModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Querie API')
    .setVersion('1.0')
    .addTag('Querie')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.startAllMicroservices();
  await app.listen(3001);
  console.log(`🚀 Application is running on: ${await app.getUrl()}`);
  console.log(`🚀 Swagger: ${await app.getUrl()}/api`);
}
bootstrap();
