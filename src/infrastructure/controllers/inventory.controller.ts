import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { InventoryDelegate } from 'src/application/delegate/inventory.delegate';
import { ProductDTO, UserDTO } from '../dto';
import { UpdateQuantityDTO } from '../dto/update-quantity.dto';
import { IBaseEventPublisher } from '../event/publishers/interface/base.event-publisher';
import { RegisteredBranchPublisher } from '../event/publishers/registeredBranch.publisher';
import { RegisteredProductEventPublisher } from '../event/publishers/registeredProduct.publisher';
import { RegisteredProductQuantityEventPublisher } from '../event/publishers/registeredProductQuantity.publisher';
import { RegisteredSellerSaleEventPublisher } from '../event/publishers/registeredResellerSale.publisher';
import { RegisteredUserEventPublisher } from '../event/publishers/registeredUser.publisher';

@Controller()
export class InventoryController {
  constructor(private readonly useCase: InventoryDelegate) {}

  private publisher: IBaseEventPublisher;
  @Post('branch')
  registerBranch(@Body() user: UserDTO) {
    this.useCase.toCreateBranch();
    this.publisher = new RegisteredBranchPublisher();
    return this.useCase.execute(user, this.publisher);
  }
  @Post('product')
  toCreateProduct(@Body() product: ProductDTO) {
    this.useCase.toCreateProduct();
    this.publisher = new RegisteredProductEventPublisher();
    return this.useCase.execute(product, this.publisher);
  }

  @Put('product/:id')
  toUpdateQuantity(
    @Param('id') id: string,
    @Body() quantity: UpdateQuantityDTO,
  ) {
    this.useCase.toModifyQuantity();
    this.publisher = new RegisteredProductQuantityEventPublisher();
    return this.useCase.execute(id, quantity.quantity, this.publisher);
  }

  @Post('product/seller/:id')
  toSellerSale(@Param('id') id: string, @Body() quantity: UpdateQuantityDTO) {
    this.useCase.toSellerSale();
    this.publisher = new RegisteredSellerSaleEventPublisher();
    return this.useCase.execute(id, quantity.quantity, this.publisher);
  }

  @Post('user')
  registerUser(@Body() user: UserDTO) {
    this.useCase.toCreateUser();
    this.publisher = new RegisteredUserEventPublisher();
    return this.useCase.execute(user, this.publisher);
  }

  @Get('product/:id')
  getProduct(@Param('id') id: string) {
    this.useCase.toGetProductById();
    return this.useCase.execute(id);
  }

  @Get('branch/:id')
  getBranch(@Param('id') id: string) {
    this.useCase.toGetBranchById();
    return this.useCase.execute(id);
  }

  @Get('user/:id')
  getUser(@Param('id') id: string) {
    this.useCase.toGetUserById();
    return this.useCase.execute(id);
  }

  @Get('product')
  getAllProducts() {
    this.useCase.toGetAllProduct();
    return this.useCase.execute();
  }

  @Get('branch')
  getAllBranch() {
    this.useCase.toGetAllBranch();
    return this.useCase.execute();
  }

  @Get('user')
  getAllUser() {
    this.useCase.toGetAllUser();
    return this.useCase.execute();
  }
}
