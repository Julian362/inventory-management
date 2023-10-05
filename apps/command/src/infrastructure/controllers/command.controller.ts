import {
  ModifyQuantityProductUseCase,
  RegisterBranchUseCase,
  RegisterProductUseCase,
  RegisterSaleUseCase,
  RegisterUserUseCase,
} from '@applications-command/use-cases';
import {
  BranchDomainEntity,
  ProductDomainEntity,
  UserDomainEntity,
} from '@domain/entities';
import { SaleDomainEntity } from '@domain/entities/sale.domain-entity';
import { SaleCommand } from '@infrastructure-command/command/sale.command';
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
    private readonly saleUseCase: RegisterSaleUseCase,
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
  toSellerSale(@Body() data: SaleCommand): Observable<SaleDomainEntity> {
    return this.saleUseCase.execute(data, 10);
  }

  @Patch('product/customer-sale')
  toCustomerSale(@Body() data: SaleCommand): Observable<SaleDomainEntity> {
    return this.saleUseCase.execute(data);
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
