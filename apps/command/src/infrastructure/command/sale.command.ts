import {
  IProductTypeCommand,
  ISaleCommand,
} from '@domain/command/sale.command';
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
