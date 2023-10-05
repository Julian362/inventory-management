import { NestFactory } from '@nestjs/core';
import { proxyModule } from './proxy.module';

async function bootstrap() {
  const app = await NestFactory.create(proxyModule);
  await app.listen(3000);
}
bootstrap();
