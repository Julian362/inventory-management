import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { InfrastructureModule } from '@infrastructure-jwt/infrastructure.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { join } from 'node:path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join(
        process.cwd(),
        'environments',
        `.env.${process.env.SCOPE?.trimEnd()}`,
      ),
    }),
    InfrastructureModule,
    RabbitMQModule.forRoot(RabbitMQModule, {
      uri: process.env.RABBITMQ_HOST || 'amqp://root:password@localhost:5672',
      connectionInitOptions: { wait: false },
    }),
  ],
  controllers: [],
  providers: [],
})
export class JWTModule {}
