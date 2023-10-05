import {
  ModifyQuantityProductUseCase,
  RegisterBranchUseCase,
  RegisterProductUseCase,
  RegisterSaleUseCase,
  RegisterUserUseCase,
} from '@applications-command/use-cases';
import { MessagingModule } from '@infrastructure-command/messaging';
import { Module } from '@nestjs/common';
import { CommandController } from './controllers';
import { RabbitPublisher } from './messaging';
import { PersistenceModule } from './persistence';
import { EventService } from './services';

@Module({
  imports: [PersistenceModule, MessagingModule],
  controllers: [CommandController],
  providers: [
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
})
export class InfrastructureModule {}
