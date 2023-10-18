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
import { Observable, map, switchMap } from 'rxjs';
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
    private readonly emailSendUseCase: EmailSendUseCase,
  ) {}

  //Product

  @Auth(RolesUserEnum.Admin, RolesUserEnum.SuperAdmin, RolesUserEnum.employee)
  @Post('product/register')
  toCreateProduct(
    @Body() product: ProductCommand,
  ): Observable<ProductDomainEntity> {
    return this.registerUseCase.execute(product);
  }

  @Auth(RolesUserEnum.Admin, RolesUserEnum.SuperAdmin, RolesUserEnum.employee)
  @Patch('product/purchase/:id')
  toUpdateQuantity(
    @Param('id') id: string,
    @Body() quantity: UpdateQuantityCommand,
  ): Observable<ProductDomainEntity> {
    return this.purchaseUseCase.execute(id, quantity.quantity);
  }

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

  @Auth(RolesUserEnum.SuperAdmin)
  @Post('branch/register')
  registerBranch(
    @Body() branch: BranchCommand,
  ): Observable<BranchDomainEntity> {
    return this.registerBranchUseCase.execute(branch);
  }

  //User

  @Auth(RolesUserEnum.SuperAdmin, RolesUserEnum.Admin)
  @Post('user/register')
  registerUser(@Body() user: UserCommand): Observable<UserDomainEntity> {
    return this.registerUserUseCase.execute(user);
  }
}
