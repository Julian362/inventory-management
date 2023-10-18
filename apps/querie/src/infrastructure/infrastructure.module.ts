import {
  GetAllBranchUseCase,
  GetAllProductUseCase,
  GetAllUserUseCase,
  GetBranchUseCase,
  GetProductUseCase,
  GetUserUseCase,
  RegisterBranchUseCase,
  RegisterProductUseCase,
  RegisterSaleUseCase,
  RegisterUserUseCase,
  UpdateQuantityProductUseCase,
} from '@applications-querie-/use-cases';
import { GetAllSaleUseCase } from '@applications-querie-/use-cases/sale/get-all.sale.use-case';
import { QuerieSubscriber } from '@infrastructure-querie/messaging';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { EmailService } from '@shared/services/email.service';
import { QuerieController } from './controllers/querie.controller';
import { PersistenceModule } from './persistence';
import { BranchService, ProductService, UserService } from './services';
import { SaleService } from './services/sale.service';
import { JwtStrategy } from './utils/strategies/jwt.strategy';

@Module({
  imports: [
    PersistenceModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '2h' },
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    PassportModule,
  ],
  controllers: [QuerieSubscriber, QuerieController],
  providers: [
    QuerieSubscriber,
    JwtStrategy,
    {
      provide: RegisterProductUseCase,
      useFactory: (productService: ProductService) => {
        return new RegisterProductUseCase(productService);
      },
      inject: [ProductService],
    },
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
      inject: [ProductService],
    },
    {
      provide: RegisterProductUseCase,
      useFactory: (productService: ProductService) => {
        return new RegisterProductUseCase(productService);
      },
      inject: [ProductService],
    },
    {
      provide: UpdateQuantityProductUseCase,
      useFactory: (productService: ProductService) => {
        return new UpdateQuantityProductUseCase(productService);
      },
      inject: [ProductService],
    },
    {
      provide: GetAllUserUseCase,
      useFactory: (service: UserService) => {
        return new GetAllUserUseCase(service);
      },
      inject: [UserService],
    },
    {
      provide: GetUserUseCase,
      useFactory: (service: UserService) => {
        return new GetUserUseCase(service);
      },
      inject: [UserService],
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
    {
      provide: RegisterSaleUseCase,
      useFactory: (
        serviceSale: SaleService,
        branchService: BranchService,
        productService: ProductService,
        userService: UserService,
        emailService: EmailService,
      ) => {
        return new RegisterSaleUseCase(
          serviceSale,
          branchService,
          productService,
          userService,
          emailService,
        );
      },
      inject: [
        SaleService,
        BranchService,
        ProductService,
        UserService,
        EmailService,
      ],
    },
    {
      provide: GetAllSaleUseCase,
      useFactory: (service: SaleService) => {
        return new GetAllSaleUseCase(service);
      },
      inject: [SaleService],
    },
  ],
  exports: [JwtStrategy, PassportModule],
})
export class InfrastructureModule {}
