import {
  RegisterBranchUseCase,
  RegisterProductUseCase,
  RegisterUserUseCase,
} from '@alpha-applications/use-cases';
import { MessagingModule, StoreEvent } from '@alpha-infrastructure/messaging';
import { Module } from '@nestjs/common';
import { AlphaController } from './controllers';
import { RabbitPublisher } from './messaging';
import { PersistenceModule } from './persistence';

@Module({
  imports: [PersistenceModule, MessagingModule],
  controllers: [AlphaController],
  providers: [
    StoreEvent,
    {
      provide: RegisterProductUseCase,
      useFactory: (
        StoreEvent: StoreEvent,
        brokerPublisher: RabbitPublisher,
      ) => {
        return new RegisterProductUseCase(StoreEvent, brokerPublisher);
      },
      inject: [StoreEvent, RabbitPublisher],
    },
    // {
    //   provide: RegisterSellerSaleUseCase,
    //   useFactory: (
    //     StoreEvent: StoreEvent,
    //     brokerPublisher: RabbitPublisher,
    //   ) => {
    //     return new RegisterSellerSaleUseCase(StoreEvent, brokerPublisher);
    //   },
    //   inject: [ProductService, StoreEvent, RabbitPublisher],
    // },
    // {
    //   provide: RegisterCustomerSaleUseCase,
    //   useFactory: (
    //     StoreEvent: StoreEvent,
    //     brokerPublisher: RabbitPublisher,
    //   ) => {
    //     return new RegisterCustomerSaleUseCase(StoreEvent, brokerPublisher);
    //   },
    //   inject: [StoreEvent, RabbitPublisher],
    // },
    // {
    //   provide: ModifyQuantityProductUseCase,
    //   useFactory: (
    //     StoreEvent: StoreEvent,
    //     brokerPublisher: RabbitPublisher,
    //   ) => {
    //     return new ModifyQuantityProductUseCase(StoreEvent, brokerPublisher);
    //   },
    //   inject: [ProductService, StoreEvent, RabbitPublisher],
    // },
    {
      provide: RegisterUserUseCase,
      useFactory: (
        StoreEvent: StoreEvent,
        brokerPublisher: RabbitPublisher,
      ) => {
        return new RegisterUserUseCase(StoreEvent, brokerPublisher);
      },
      inject: [StoreEvent, RabbitPublisher],
    },
    {
      provide: RegisterBranchUseCase,
      useFactory: (
        StoreEvent: StoreEvent,
        brokerPublisher: RabbitPublisher,
      ) => {
        return new RegisterBranchUseCase(StoreEvent, brokerPublisher);
      },
      inject: [StoreEvent, RabbitPublisher],
    },
  ],
})
export class InfrastructureModule {}
