import {
  GetAllBranchUseCase,
  GetAllProductUseCase,
  GetAllSaleUseCase,
  GetAllUserUseCase,
  GetBranchUseCase,
  GetProductUseCase,
  GetUserUseCase,
} from '@applications-querie-/use-cases';
import {
  BranchDomainEntity,
  ProductDomainEntity,
  SaleDomainEntity,
  UserDomainEntity,
} from '@domain/entities';
import { RolesUserEnum } from '@enums';
import { Auth } from '@infrastructure-querie/utils/utils/decorators/auth.decorator';
import { Controller, Get, Param } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Observable } from 'rxjs';
@ApiBearerAuth('JWT')
@ApiTags('Querie')
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
  @ApiOperation({ summary: 'Obtener Usuario' })
  @ApiResponse({
    status: 200,
    description: 'Usuario obtenido',
    type: UserDomainEntity,
  })
  @Auth(RolesUserEnum.Admin, RolesUserEnum.SuperAdmin)
  @Get('user/:id')
  toGetUser(@Param('id') id: string): Observable<UserDomainEntity> {
    return this.getUserUseCase.execute(id);
  }

  @ApiOperation({ summary: 'Obtener Usuarios' })
  @ApiResponse({
    status: 200,
    description: 'Usuarios obtenidos',
    type: [UserDomainEntity],
  })
  @Auth(RolesUserEnum.SuperAdmin)
  @Get('users')
  toGetAllUser(): Observable<UserDomainEntity[]> {
    return this.getAllUserUseCase.execute();
  }

  //Product
  @ApiOperation({ summary: 'Obtener Producto' })
  @ApiResponse({
    status: 200,
    description: 'Producto obtenido',
    type: ProductDomainEntity,
  })
  @Auth(RolesUserEnum.Admin, RolesUserEnum.SuperAdmin, RolesUserEnum.employee)
  @Get('product/:id')
  toGetProduct(@Param('id') id: string): Observable<ProductDomainEntity> {
    return this.getProductUseCase.execute(id);
  }

  @ApiOperation({ summary: 'Obtener Productos' })
  @ApiResponse({
    status: 200,
    description: 'Productos obtenidos',
    type: [ProductDomainEntity],
  })
  @Auth(RolesUserEnum.Admin, RolesUserEnum.SuperAdmin, RolesUserEnum.employee)
  @Get('products/:id')
  toGetAllProduct(@Param('id') id: string): Observable<ProductDomainEntity[]> {
    return this.getAllProductUseCase.execute(id);
  }

  //Branch
  @ApiOperation({ summary: 'Obtener Sucursal' })
  @ApiResponse({
    status: 200,
    description: 'Sucursal obtenida',
    type: SaleDomainEntity,
  })
  @Auth(RolesUserEnum.Admin, RolesUserEnum.SuperAdmin)
  @Get('branch/:id')
  toGetBranch(@Param('id') id: string): Observable<BranchDomainEntity> {
    return this.getBranchUseCase.execute(id);
  }

  @ApiOperation({ summary: 'Obtener Sucursales' })
  @ApiResponse({
    status: 200,
    description: 'Sucursales obtenidas',
    type: [BranchDomainEntity],
  })
  @Auth(RolesUserEnum.SuperAdmin)
  @Get('branches')
  toGetAllBranch(): Observable<BranchDomainEntity[]> {
    return this.getAllBranchUseCase.execute();
  }

  //Sale
  @ApiOperation({ summary: 'Obtener Ventas' })
  @ApiResponse({
    status: 200,
    description: 'Ventas obtenidas',
    type: [SaleDomainEntity],
  })
  @Auth(RolesUserEnum.Admin, RolesUserEnum.SuperAdmin, RolesUserEnum.employee)
  @Get('sales/:id')
  toGetAllSale(@Param('id') id: string): Observable<SaleDomainEntity[]> {
    return this.getAllSaleUseCase.execute(id);
  }
}
