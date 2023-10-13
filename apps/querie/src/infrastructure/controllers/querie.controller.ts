import {
  GetAllBranchUseCase,
  GetAllProductUseCase,
  GetAllSaleUseCase,
  GetAllUserUseCase,
  GetBranchUseCase,
  GetProductUseCase,
  GetUserUseCase,
} from '@applications-querie-/use-cases';
import { RolesUserEnum } from '@enums';
import { Auth } from '@infrastructure-querie/utils/utils/decorators/auth.decorator';
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
  @Auth(RolesUserEnum.Admin, RolesUserEnum.SuperAdmin)
  @Get('user/:id')
  toGetUser(@Param('id') id: string) {
    return this.getUserUseCase.execute(id);
  }

  @Auth(RolesUserEnum.SuperAdmin)
  @Get('users')
  toGetAllUser() {
    return this.getAllUserUseCase.execute();
  }

  @Auth(RolesUserEnum.Admin, RolesUserEnum.SuperAdmin, RolesUserEnum.employee)
  //Product
  @Get('product/:id')
  toGetProduct(@Param('id') id: string) {
    return this.getProductUseCase.execute(id);
  }

  @Auth(RolesUserEnum.Admin, RolesUserEnum.SuperAdmin, RolesUserEnum.employee)
  @Get('products/:id')
  toGetAllProduct(@Param('id') id: string) {
    return this.getAllProductUseCase.execute(id);
  }

  //Branch
  @Auth(RolesUserEnum.Admin, RolesUserEnum.SuperAdmin)
  @Get('branch/:id')
  toGetBranch(@Param('id') id: string) {
    return this.getBranchUseCase.execute(id);
  }

  @Auth(RolesUserEnum.SuperAdmin)
  @Get('branches')
  toGetAllBranch() {
    return this.getAllBranchUseCase.execute();
  }

  //Sale
  @Auth(RolesUserEnum.Admin, RolesUserEnum.SuperAdmin, RolesUserEnum.employee)
  @Get('sales/:id')
  toGetAllSale(@Param('id') id: string) {
    return this.getAllSaleUseCase.execute(id);
  }
}
