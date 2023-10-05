import {
  IProductTypeCommand,
  ISaleCommand,
} from '@domain/command/sale.command';
import { TypeNamesEnum } from '@enums';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  Min,
  ValidateNested,
} from 'class-validator';

export class SaleCommand implements ISaleCommand {
  @ValidateNested({ each: true })
  products: ProductsTypeCommand[];

  @IsNotEmpty()
  @IsString()
  type:
    | TypeNamesEnum.RegisteredCustomerSale
    | TypeNamesEnum.RegisteredSellerSale;

  @IsString()
  @IsUUID()
  @IsNotEmpty()
  branchId: string;
}

class ProductsTypeCommand implements IProductTypeCommand {
  @IsUUID()
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsNumber()
  @Min(1)
  quantity: number;
}
