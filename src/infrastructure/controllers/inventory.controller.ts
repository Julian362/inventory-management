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
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import {
  BranchCommand,
  ProductCommand,
  UpdateQuantityCommand,
  UserCommand,
} from '../command';
import {
  RegisteredBranchPublisher,
  RegisteredCustomerSaleEventPublisher,
  RegisteredProductEventPublisher,
  RegisteredProductQuantityEventPublisher,
  RegisteredSellerSaleEventPublisher,
  RegisteredUserEventPublisher,
} from '../event';

@Controller('api/v1')
@Controller()
export class InventoryController {
  constructor(
    private readonly getAllProductUseCase: GetAllProductUseCase,
    private readonly getProductUseCase: GetProductUseCase,
    private readonly registerUseCase: RegisterProductUseCase,
    private readonly sellerSaleUseCase: RegisterSellerSaleUseCase,
    private readonly customerSaleUseCase: RegisterCustomerSaleUseCase,
    private readonly purchaseUseCase: ModifyQuantityProductUseCase,
    private readonly getAllUserUseCase: GetAllUserUseCase,
    private readonly getUserUseCase: GetUserUseCase,
    private readonly registerUserUseCase: RegisterUserUseCase,
    private readonly getAllBranchUseCase: GetAllBranchUseCase,
    private readonly getBranchUseCase: GetBranchUseCase,
    private readonly registerBranchUseCase: RegisterBranchUseCase,
    private readonly registeredBranchPublisher: RegisteredBranchPublisher,
    private readonly registeredCustomerSalePublisher: RegisteredCustomerSaleEventPublisher,
    private readonly registeredProductPublisher: RegisteredProductEventPublisher,
    private readonly registeredProductQuantityPublisher: RegisteredProductQuantityEventPublisher,
    private readonly registeredSellerSalePublisher: RegisteredSellerSaleEventPublisher,
    private readonly registeredUserPublisher: RegisteredUserEventPublisher,
  ) {}

  //Product

  @Get('product/:id')
  getProduct(@Param('id') id: string) {
    return this.getProductUseCase.execute(id);
  }

  @Get('products')
  getAllProducts() {
    return this.getAllProductUseCase.execute();
  }

  @Post('product/register')
  toCreateProduct(@Body() product: ProductCommand) {
    return this.registerUseCase.execute(
      product,
      this.registeredProductPublisher,
    );
  }

  @Put('product/purchase/:id')
  toUpdateQuantity(
    @Param('id') id: string,
    @Body() quantity: UpdateQuantityCommand,
  ) {
    return this.purchaseUseCase.execute(
      id,
      quantity.quantity,
      this.registeredProductQuantityPublisher,
    );
  }

  @Post('product/seller-sale/:id')
  toSellerSale(
    @Param('id') id: string,
    @Body() quantity: UpdateQuantityCommand,
  ) {
    return this.sellerSaleUseCase.execute(
      id,
      quantity.quantity,
      this.registeredSellerSalePublisher,
    );
  }

  @Post('product/customer-sale/:id')
  toCustomerSale(
    @Param('id') id: string,
    @Body() quantity: UpdateQuantityCommand,
  ) {
    return this.customerSaleUseCase.execute(
      id,
      quantity.quantity,
      this.registeredCustomerSalePublisher,
    );
  }

  //Branch

  @Get('branch/:id')
  getBranch(@Param('id') id: string) {
    return this.getBranchUseCase.execute(id);
  }

  @Post('branch/register')
  registerBranch(@Body() branch: BranchCommand) {
    return this.registerBranchUseCase.execute(
      branch,
      this.registeredBranchPublisher,
    );
  }

  @Get('branches')
  getAllBranch() {
    return this.getAllBranchUseCase.execute();
  }

  //User

  @Post('user/register')
  registerUser(@Body() user: UserCommand) {
    return this.registerUserUseCase.execute(user, this.registeredUserPublisher);
  }

  @Get('user/:id')
  getUser(@Param('id') id: string) {
    return this.getUserUseCase.execute(id);
  }

  @Get('users')
  getAllUser() {
    return this.getAllUserUseCase.execute();
  }
}
