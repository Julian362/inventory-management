import {
  EmailSendUseCase,
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
import { RolesUserEnum } from '@enums';
import { SaleCommand } from '@infrastructure-command/command/sale.command';
import { Auth } from '@infrastructure-command/utils/decorators/auth.decorator';
import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Observable, map, switchMap } from 'rxjs';
import {
  BranchCommand,
  ProductCommand,
  UpdateQuantityCommand,
  UserCommand,
} from '../command';

@ApiBearerAuth('JWT')
@ApiTags('Command')
@Controller('api/v1')
export class CommandController {
  constructor(
    private readonly registerUseCase: RegisterProductUseCase,
    private readonly saleUseCase: RegisterSaleUseCase,
    private readonly purchaseUseCase: ModifyQuantityProductUseCase,
    private readonly registerUserUseCase: RegisterUserUseCase,
    private readonly registerBranchUseCase: RegisterBranchUseCase,
    private readonly emailSendUseCase: EmailSendUseCase,
  ) {}

  //Product

  @ApiOperation({ summary: 'Registrar Producto' })
  @ApiResponse({
    status: 200,
    description: 'Producto registrado',
    type: ProductDomainEntity,
  })
  @Auth(RolesUserEnum.Admin, RolesUserEnum.SuperAdmin, RolesUserEnum.employee)
  @Post('product/register')
  toCreateProduct(
    @Body() product: ProductCommand,
  ): Observable<ProductDomainEntity> {
    return this.registerUseCase.execute(product);
  }

  @ApiOperation({ summary: 'Registrar Compra' })
  @ApiResponse({
    status: 200,
    description: 'Compra registrada',
    type: ProductDomainEntity,
  })
  @Auth(RolesUserEnum.Admin, RolesUserEnum.SuperAdmin, RolesUserEnum.employee)
  @Patch('product/purchase/:id')
  toUpdateQuantity(
    @Param('id') id: string,
    @Body() quantity: UpdateQuantityCommand,
  ): Observable<ProductDomainEntity> {
    return this.purchaseUseCase.execute(id, quantity.quantity);
  }

  //Sale
  @ApiOperation({ summary: 'Registrar Venta' })
  @ApiResponse({
    status: 200,
    description: 'Venta registrada',
    type: SaleDomainEntity,
  })
  @Auth(RolesUserEnum.Admin, RolesUserEnum.SuperAdmin, RolesUserEnum.employee)
  @Patch('product/seller-sale')
  toSellerSale(@Body() data: SaleCommand): Observable<SaleDomainEntity> {
    return this.saleUseCase.execute(data, 10).pipe(
      switchMap((sale) => {
        return this.emailSendUseCase
          .execute(
            'tooltraxpro@juliangarcia.tech',
            [data.email],
            `Venta realizada ${sale.number}`,
            sale,
          )
          .pipe(map(() => sale));
      }),
    );
  }

  @ApiOperation({ summary: 'Registrar Venta' })
  @ApiResponse({
    status: 200,
    description: 'Venta registrada',
    type: SaleDomainEntity,
  })
  @Auth(RolesUserEnum.Admin, RolesUserEnum.SuperAdmin, RolesUserEnum.employee)
  @Patch('product/customer-sale')
  toCustomerSale(@Body() data: SaleCommand): Observable<SaleDomainEntity> {
    return this.saleUseCase.execute(data).pipe(
      switchMap((sale) => {
        return this.emailSendUseCase
          .execute(
            'tooltraxpro@juliangarcia.tech',
            [data.email],
            `Venta realizada ${sale.number}`,
            sale,
          )
          .pipe(map(() => sale));
      }),
    );
  }

  //Branch

  @ApiOperation({ summary: 'Registrar Sucursal' })
  @ApiResponse({
    status: 200,
    description: 'Sucursal registrada',
    type: BranchDomainEntity,
  })
  @Auth(RolesUserEnum.SuperAdmin)
  @Post('branch/register')
  registerBranch(
    @Body() branch: BranchCommand,
  ): Observable<BranchDomainEntity> {
    return this.registerBranchUseCase.execute(branch);
  }

  //User

  @ApiOperation({ summary: 'Registrar Usuario' })
  @ApiResponse({
    status: 200,
    description: 'Usuario registrado',
    type: UserDomainEntity,
  })
  @Auth(RolesUserEnum.SuperAdmin, RolesUserEnum.Admin)
  @Post('user/register')
  registerUser(@Body() user: UserCommand): Observable<UserDomainEntity> {
    return this.registerUserUseCase.execute(user);
  }
}
