import { NestFactory } from '@nestjs/core';
import { GamaModule } from './gama.module';

async function bootstrap() {
  const app = await NestFactory.create(GamaModule);
  await app.listen(3000);
}
bootstrap();
