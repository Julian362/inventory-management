import {
  GetAllBranchUseCase,
  GetAllProductUseCase,
  GetAllUserUseCase,
  GetBranchUseCase,
  GetProductUseCase,
  GetUserUseCase,
  ModifyQuantityProductUseCase,
  RegisterBranchUseCase,
  RegisterCustomerSaleUseCase,
  RegisterProductUseCase,
  RegisterSellerSaleUseCase,
  RegisterUserUseCase,
} from '@applications/use-cases';
import { Module } from '@nestjs/common';
import { InventoryController } from './controllers';
import {
  RegisteredBranchPublisher,
  RegisteredCustomerSaleEventPublisher,
  RegisteredProductEventPublisher,
  RegisteredProductQuantityEventPublisher,
  RegisteredSellerSaleEventPublisher,
  RegisteredUserEventPublisher,
} from './event';
import { PersistenceModule } from './persistence/persistence.module';
import {
  BranchService,
  EventService,
  ProductService,
  UserService,
} from './services';

@Module({
  imports: [PersistenceModule],
  controllers: [InventoryController],
  providers: [
    RegisteredBranchPublisher,
    RegisteredCustomerSaleEventPublisher,
    RegisteredUserEventPublisher,
    RegisteredCustomerSaleEventPublisher,
    RegisteredSellerSaleEventPublisher,
    RegisteredProductEventPublisher,
    RegisteredProductQuantityEventPublisher,
    {
      provide: GetAllProductUseCase,
      useFactory: (productService: ProductService) => {
        return new GetAllProductUseCase(productService);
      },
      inject: [ProductService],
    },
    {
      provide: GetProductUseCase,
      useFactory: (productService: ProductService) => {
        return new GetProductUseCase(productService);
      },
    },
    {
      provide: RegisterProductUseCase,
      useFactory: (
        productService: ProductService,
        eventService: EventService,
      ) => {
        return new RegisterProductUseCase(productService, eventService);
      },
      inject: [ProductService, EventService],
    },
    {
      provide: RegisterSellerSaleUseCase,
      useFactory: (
        productService: ProductService,
        eventService: EventService,
      ) => {
        return new RegisterSellerSaleUseCase(productService, eventService);
      },
      inject: [ProductService, EventService],
    },
    {
      provide: RegisterCustomerSaleUseCase,
      useFactory: (
        productService: ProductService,
        eventService: EventService,
      ) => {
        return new RegisterCustomerSaleUseCase(productService, eventService);
      },
      inject: [ProductService, EventService],
    },
    {
      provide: ModifyQuantityProductUseCase,
      useFactory: (
        productService: ProductService,
        eventService: EventService,
      ) => {
        return new ModifyQuantityProductUseCase(productService, eventService);
      },
      inject: [ProductService, EventService],
    },
    {
      provide: GetAllUserUseCase,
      useFactory: (service: UserService) => {
        return new GetAllUserUseCase(service);
      },
      inject: [ProductService],
    },
    {
      provide: GetUserUseCase,
      useFactory: (service: UserService) => {
        return new GetUserUseCase(service);
      },
      inject: [ProductService],
    },
    {
      provide: RegisterUserUseCase,
      useFactory: (service: UserService, eventService: EventService) => {
        return new RegisterUserUseCase(service, eventService);
      },
      inject: [UserService, EventService],
    },
    {
      provide: GetAllBranchUseCase,
      useFactory: (service: BranchService) => {
        return new GetAllBranchUseCase(service);
      },
      inject: [BranchService],
    },
    {
      provide: GetBranchUseCase,
      useFactory: (service: BranchService) => {
        return new GetBranchUseCase(service);
      },
      inject: [BranchService],
    },
    {
      provide: RegisterBranchUseCase,
      useFactory: (service: BranchService, eventService: EventService) => {
        return new RegisterBranchUseCase(service, eventService);
      },
      inject: [BranchService, EventService],
    },
  ],
})
export class InventoryModule {}
