import { MessagingModule } from '@alpha-infrastructure/messaging';
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
} from '@beta-applications/use-cases';
import { Module } from '@nestjs/common';
import { BetaSubscriber } from './messaging';
import { PersistenceModule } from './persistence';
import { BranchService, ProductService, UserService } from './services';

@Module({
  imports: [PersistenceModule, MessagingModule],
  controllers: [BetaSubscriber],
  providers: [
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
      useFactory: (productService: ProductService) => {
        return new RegisterProductUseCase(productService);
      },
      inject: [ProductService],
    },
    {
      provide: RegisterSellerSaleUseCase,
      useFactory: (productService: ProductService) => {
        return new RegisterSellerSaleUseCase(productService);
      },
      inject: [ProductService],
    },
    {
      provide: RegisterCustomerSaleUseCase,
      useFactory: (productService: ProductService) => {
        return new RegisterCustomerSaleUseCase(productService);
      },
      inject: [ProductService],
    },
    {
      provide: ModifyQuantityProductUseCase,
      useFactory: (productService: ProductService) => {
        return new ModifyQuantityProductUseCase(productService);
      },
      inject: [ProductService],
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
      useFactory: (service: UserService) => {
        return new RegisterUserUseCase(service);
      },
      inject: [UserService],
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
      useFactory: (service: BranchService) => {
        return new RegisterBranchUseCase(service);
      },
      inject: [BranchService],
    },
  ],
})
export class InfrastructureModule {}
