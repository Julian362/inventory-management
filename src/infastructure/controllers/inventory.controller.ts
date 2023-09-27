import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { InventoryDelegate } from 'src/application/delegate/inventory.delegate';
import { ProductDTO, UserDTO } from '../dto';
import { UpdateQuantityDTO } from '../dto/update-quantity.dto';
import { BranchService, ProductService, UserService } from '../services';

@Controller()
export class InventoryController {
  private useCase: InventoryDelegate;
  constructor(
    private readonly productService: ProductService,
    private readonly branchService: BranchService,
    private readonly userService: UserService,
  ) {
    this.useCase = new InventoryDelegate(
      this.productService,
      this.branchService,
      this.userService,
    );
  }
  @Post('branch')
  registerBranch(@Body() user: UserDTO) {
    this.useCase.toCreateBranch();
    return this.useCase.execute(user);
  }
  @Post('product')
  toCreateProduct(@Body() product: ProductDTO) {
    this.useCase.toCreateProduct();
    return this.useCase.execute(product);
  }

  @Put('product/:id')
  toUpdateQuantity(
    @Param('id') id: string,
    @Body() quantity: UpdateQuantityDTO,
  ) {
    this.useCase.toModifyQuantity();
    return this.useCase.execute(id, quantity.quantity);
  }

  @Post('product/seller/:id')
  toSellerSale(@Param('id') id: string, @Body() quantity: UpdateQuantityDTO) {
    this.useCase.toSellerSale();
    return this.useCase.execute(id, quantity.quantity);
  }

  @Post('user')
  registerUser(@Body() user: UserDTO) {
    this.useCase.toCreateUser();
    return this.useCase.execute(user);
  }
}
