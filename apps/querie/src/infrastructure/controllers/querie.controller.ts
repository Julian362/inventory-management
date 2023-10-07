import {
  GetAllBranchUseCase,
  GetAllProductUseCase,
  GetAllSaleUseCase,
  GetAllUserUseCase,
  GetBranchUseCase,
  GetProductUseCase,
  GetUserUseCase,
} from '@applications-querie-/use-cases';
import { Controller, Get, Param } from '@nestjs/common';

@Controller('api/v1')
export class QuerieController {
  constructor(
    private readonly getUserUseCase: GetUserUseCase,
    private readonly getAllUserUseCase: GetAllUserUseCase,
    private readonly getProductUseCase: GetProductUseCase,
    private readonly getAllProductUseCase: GetAllProductUseCase,
    private readonly getBranchUseCase: GetBranchUseCase,
    private readonly getAllBranchUseCase: GetAllBranchUseCase,
    private readonly getAllSaleUseCase: GetAllSaleUseCase,
  ) {}

  //User
  @Get('user/:id')
  toGetUser(@Param('id') id: string) {
    return this.getUserUseCase.execute(id);
  }

  @Get('users')
  toGetAllUser() {
    return this.getAllUserUseCase.execute();
  }

  //Product
  @Get('product/:id')
  toGetProduct(@Param('id') id: string) {
    return this.getProductUseCase.execute(id);
  }

  @Get('products/:id')
  toGetAllProduct(@Param('id') id: string) {
    return this.getAllProductUseCase.execute(id);
  }

  //Branch
  @Get('branch/:id')
  toGetBranch(@Param('id') id: string) {
    return this.getBranchUseCase.execute(id);
  }

  @Get('branches')
  toGetAllBranch() {
    return this.getAllBranchUseCase.execute();
  }

  //Sale
  @Get('sales/:id')
  toGetAllSale(@Param('id') id: string) {
    return this.getAllSaleUseCase.execute(id);
  }
}
