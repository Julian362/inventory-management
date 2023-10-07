import {
  IProductTypeCommand,
  ISaleCommand,
} from '@domain/command/sale.command';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  Min,
  ValidateNested,
} from 'class-validator';

export class SaleCommand implements ISaleCommand {
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductsTypeCommand)
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
