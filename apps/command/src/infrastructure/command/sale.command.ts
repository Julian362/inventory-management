import {
  IProductTypeCommand,
  ISaleCommand,
} from '@domain/command/sale.command';
import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({
    description: 'Productos de la venta',
    example: [
      {
        id: 'fdca7a8e-9585-4890-9d57-84a88820ae52',
        quantity: 1,
      },
    ],
  })
  @IsDefined({
    message: 'Los productos son requeridos',
  })
  @IsArray({
    message: 'Los productos deben ser un arreglo',
  })
  @ValidateNested({ each: true })
  @Type(() => ProductsTypeCommand)
  products: ProductsTypeCommand[];

  @ApiProperty({
    description: 'Id de la sucursal',
    example: 'fdca7a8e-9585-4890-9d57-84a88820ae52',
  })
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

  @ApiProperty({
    description: 'email del usuario',
    example: 'email@email.com',
  })
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
