import {
  GetAllBranchUseCase,
  GetAllProductUseCase,
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

  @Get('products')
  toGetAllProduct() {
    return this.getAllProductUseCase.execute();
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
}
