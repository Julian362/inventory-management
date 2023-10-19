import { IProductCommand } from '@domain/command';
import { ProductCategory } from '@enums';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  Length,
  Min,
} from 'class-validator';

export class ProductCommand implements IProductCommand {
  id?: string;

  @ApiProperty({
    description: 'Nombre del producto',
    example: 'Producto 1',
  })
  @IsString({
    message: 'El nombre del producto debe ser una cadena de caracteres',
  })
  @IsNotEmpty({
    message: 'El nombre del producto es requerido',
  })
  @Length(3, 30, {
    message: 'El nombre del producto debe tener entre 3 y 30 caracteres',
  })
  name: string;

  @ApiProperty({
    description: 'Categoría del producto',
    example: ProductCategory.ConstructionHardware,
  })
  @IsString({
    message: 'La categoría del producto debe ser una cadena de caracteres',
  })
  @IsNotEmpty({
    message: 'La categoría del producto es requerida',
  })
  @Length(3, 30, {
    message: 'La categoría del producto debe tener entre 3 y 30 caracteres',
  })
  category: string;

  @ApiProperty({
    description: 'Precio del producto',
    example: 100,
  })
  @IsNumber(
    {},
    {
      message: 'El precio del producto debe ser un número',
    },
  )
  @Min(0, {
    message: 'El precio del producto debe ser mayor a 0',
  })
  price: number;

  @ApiProperty({
    description: 'Descripción del producto',
    example: 'Descripción del producto',
  })
  @IsString({
    message: 'La descripción del producto debe ser una cadena de caracteres',
  })
  @IsNotEmpty({
    message: 'La descripción del producto es requerida',
  })
  @Length(3, 300, {
    message: 'La descripción del producto debe tener entre 3 y 300 caracteres',
  })
  description: string;

  @ApiProperty({
    description: 'Cantidad del producto',
    example: 10,
  })
  @IsNumber(
    {},
    {
      message: 'La cantidad del producto debe ser un número',
    },
  )
  @IsNotEmpty({
    message: 'La cantidad del producto es requerida',
  })
  quantity: number;

  @ApiProperty({
    description: 'Id de la sucursal',
    example: 'fdca7a8e-9585-4890-9d57-84a88820ae52',
  })
  @IsString({
    message: 'El id de la sucursal debe ser una cadena de caracteres',
  })
  @IsNotEmpty({
    message: 'El id de la sucursal es requerido',
  })
  @IsUUID('all', {
    message: 'El id de la sucursal debe ser un UUID válido',
  })
  branchId: string;
}
