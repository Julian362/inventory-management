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
  @IsDefined({
    message: 'Los productos son requeridos',
  })
  @IsArray({
    message: 'Los productos deben ser un arreglo',
  })
  @ValidateNested({ each: true })
  @Type(() => ProductsTypeCommand)
  products: ProductsTypeCommand[];

  @IsString({
    message: 'El id de la sucursal debe ser una cadena de caracteres',
  })
  @IsUUID('all', {
    message: 'El id de la sucursal debe ser un UUID válido',
  })
  @IsNotEmpty({
    message: 'El id de la sucursal es requerido',
  })
  branchId: string;

  @IsString({
    message: 'El email del usuario debe ser una cadena de caracteres',
  })
  @IsNotEmpty({
    message: 'El email del usuario es requerido',
  })
  email: string;
}

class ProductsTypeCommand implements IProductTypeCommand {
  @IsUUID('all', {
    message: 'El id del producto debe ser un UUID válido',
  })
  @IsString({
    message: 'El id del producto debe ser una cadena de caracteres',
  })
  @IsNotEmpty({
    message: 'El id del producto es requerido',
  })
  id: string;

  @IsNumber(
    {},
    {
      message: 'La cantidad del producto debe ser un número',
    },
  )
  @Min(1, {
    message: 'La cantidad del producto debe ser mayor a 0',
  })
  quantity: number;
}
