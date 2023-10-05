import {
  ModifyQuantityProductUseCase,
  RegisterBranchUseCase,
  RegisterCustomerSaleUseCase,
  RegisterProductUseCase,
  RegisterSellerSaleUseCase,
  RegisterUserUseCase,
} from '@applications-command/use-cases';
import {
  BranchDomainEntity,
  ProductDomainEntity,
  UserDomainEntity,
} from '@domain/entities';
import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { Observable } from 'rxjs';
import {
  BranchCommand,
  ProductCommand,
  UpdateQuantityCommand,
  UserCommand,
} from '../command';

@Controller('api/v1')
export class CommandController {
  constructor(
    private readonly registerUseCase: RegisterProductUseCase,
    private readonly sellerSaleUseCase: RegisterSellerSaleUseCase,
    private readonly customerSaleUseCase: RegisterCustomerSaleUseCase,
    private readonly purchaseUseCase: ModifyQuantityProductUseCase,
    private readonly registerUserUseCase: RegisterUserUseCase,
    private readonly registerBranchUseCase: RegisterBranchUseCase,
  ) {}

  //Product

  @Post('product/register')
  toCreateProduct(
    @Body() product: ProductCommand,
  ): Observable<ProductDomainEntity> {
    return this.registerUseCase.execute(product);
  }

  @Patch('product/purchase/:id')
  toUpdateQuantity(
    @Param('id') id: string,
    @Body() quantity: UpdateQuantityCommand,
  ): Observable<ProductDomainEntity> {
    return this.purchaseUseCase.execute(id, quantity.quantity);
  }

  @Patch('product/seller-sale/:id')
  toSellerSale(
    @Param('id') id: string,
    @Body() quantity: UpdateQuantityCommand,
  ): Observable<ProductDomainEntity> {
    return this.sellerSaleUseCase.execute(id, quantity.quantity);
  }

  @Patch('product/customer-sale/:id')
  toCustomerSale(
    @Param('id') id: string,
    @Body() quantity: UpdateQuantityCommand,
  ): Observable<ProductDomainEntity> {
    return this.customerSaleUseCase.execute(id, quantity.quantity);
  }

  //Branch

  @Post('branch/register')
  registerBranch(
    @Body() branch: BranchCommand,
  ): Observable<BranchDomainEntity> {
    return this.registerBranchUseCase.execute(branch);
  }

  //User

  @Post('user/register')
  registerUser(@Body() user: UserCommand): Observable<UserDomainEntity> {
    return this.registerUserUseCase.execute(user);
  }
}
