import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { JWTModule } from './jwt.module';

async function bootstrap() {
  const app = await NestFactory.create(JWTModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('JWT API')
    .setVersion('1.0')
    .addTag('JWT')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.startAllMicroservices();
  await app.listen(3003);
  console.log(`🚀 Application is running on: ${await app.getUrl()}`);
  console.log(`🚀 Swagger: ${await app.getUrl()}/api`);
}
bootstrap();
