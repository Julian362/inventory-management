import {
  ModifyQuantityProductUseCase,
  RegisterBranchUseCase,
  RegisterProductUseCase,
  RegisterSaleUseCase,
  RegisterUserUseCase,
} from '@applications-command/use-cases';
import { MessagingModule } from '@infrastructure-command/messaging';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { CommandController } from './controllers';
import { RabbitPublisher } from './messaging';
import { PersistenceModule } from './persistence';
import { EventService } from './services';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '2h' },
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    PassportModule,
    PersistenceModule,
    MessagingModule,
  ],
  controllers: [CommandController],
  providers: [
    JwtStrategy,
    {
      provide: RegisterProductUseCase,
      useFactory: (
        eventService: EventService,
        brokerPublisher: RabbitPublisher,
      ) => {
        return new RegisterProductUseCase(eventService, brokerPublisher);
      },
      inject: [EventService, RabbitPublisher],
    },
    {
      provide: RegisterSaleUseCase,
      useFactory: (
        eventService: EventService,
        brokerPublisher: RabbitPublisher,
      ) => {
        return new RegisterSaleUseCase(eventService, brokerPublisher);
      },
      inject: [EventService, RabbitPublisher],
    },
    {
      provide: ModifyQuantityProductUseCase,
      useFactory: (
        eventService: EventService,
        brokerPublisher: RabbitPublisher,
      ) => {
        return new ModifyQuantityProductUseCase(eventService, brokerPublisher);
      },
      inject: [EventService, RabbitPublisher],
    },
    {
      provide: RegisterUserUseCase,
      useFactory: (
        eventService: EventService,
        brokerPublisher: RabbitPublisher,
      ) => {
        return new RegisterUserUseCase(eventService, brokerPublisher);
      },
      inject: [EventService, RabbitPublisher],
    },
    {
      provide: RegisterBranchUseCase,
      useFactory: (
        eventService: EventService,
        brokerPublisher: RabbitPublisher,
      ) => {
        return new RegisterBranchUseCase(eventService, brokerPublisher);
      },
      inject: [EventService, RabbitPublisher],
    },
  ],
  exports: [JwtStrategy, PassportModule],
})
export class InfrastructureModule {}
