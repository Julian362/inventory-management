import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { InventoryDelegate } from 'src/application/delegate/inventory.delegate';
import { BranchCommand, ProductCommand, UserCommand } from '../command';
import { UpdateQuantityCommand } from '../command/update-quantity.command';
import { IBaseEventPublisher } from '../event/publishers/interface/base.event-publisher';
import { RegisteredBranchPublisher } from '../event/publishers/registeredBranch.publisher';
import { RegisteredCustomerSaleEventPublisher } from '../event/publishers/registeredCustomerSale.publisher';
import { RegisteredProductEventPublisher } from '../event/publishers/registeredProduct.publisher';
import { RegisteredProductQuantityEventPublisher } from '../event/publishers/registeredProductQuantity.publisher';
import { RegisteredSellerSaleEventPublisher } from '../event/publishers/registeredResellerSale.publisher';
import { RegisteredUserEventPublisher } from '../event/publishers/registeredUser.publisher';

@Controller('api/v1')
@Controller()
export class InventoryController {
  constructor(private readonly useCase: InventoryDelegate) {}

  private publisher: IBaseEventPublisher;

  //Product

  @Get('product/:id')
  getProduct(@Param('id') id: string) {
    this.useCase.toGetProductById();
    return this.useCase.execute(id);
  }

  @Get('products')
  getAllProducts() {
    this.useCase.toGetAllProduct();
    return this.useCase.execute();
  }

  @Post('product/register')
  toCreateProduct(@Body() product: ProductCommand) {
    this.useCase.toCreateProduct();
    this.publisher = new RegisteredProductEventPublisher();
    return this.useCase.execute(product, this.publisher);
  }

  @Put('product/purchase/:id')
  toUpdateQuantity(
    @Param('id') id: string,
    @Body() quantity: UpdateQuantityCommand,
  ) {
    this.useCase.toModifyQuantity();
    this.publisher = new RegisteredProductQuantityEventPublisher();
    return this.useCase.execute(id, quantity.quantity, this.publisher);
  }

  @Post('product/seller-sale/:id')
  toSellerSale(
    @Param('id') id: string,
    @Body() quantity: UpdateQuantityCommand,
  ) {
    this.useCase.toSellerSale();
    this.publisher = new RegisteredSellerSaleEventPublisher();
    return this.useCase.execute(id, quantity.quantity, this.publisher);
  }

  @Post('product/customer-sale/:id')
  toCustomerSale(
    @Param('id') id: string,
    @Body() quantity: UpdateQuantityCommand,
  ) {
    this.useCase.toCustomerSale();
    this.publisher = new RegisteredCustomerSaleEventPublisher();
    return this.useCase.execute(id, quantity.quantity, this.publisher);
  }

  //Branch

  @Get('branch/:id')
  getBranch(@Param('id') id: string) {
    this.useCase.toGetBranchById();
    return this.useCase.execute(id);
  }

  @Post('branch/register')
  registerBranch(@Body() branch: BranchCommand) {
    this.useCase.toCreateBranch();
    this.publisher = new RegisteredBranchPublisher();
    return this.useCase.execute(branch, this.publisher);
  }

  @Get('branches')
  getAllBranch() {
    this.useCase.toGetAllBranch();
    return this.useCase.execute();
  }

  //User

  @Post('user/register')
  registerUser(@Body() user: UserCommand) {
    this.useCase.toCreateUser();
    this.publisher = new RegisteredUserEventPublisher();
    return this.useCase.execute(user, this.publisher);
  }

  @Get('user/:id')
  getUser(@Param('id') id: string) {
    this.useCase.toGetUserById();
    return this.useCase.execute(id);
  }

  @Get('users')
  getAllUser() {
    this.useCase.toGetAllUser();
    return this.useCase.execute();
  }
}
