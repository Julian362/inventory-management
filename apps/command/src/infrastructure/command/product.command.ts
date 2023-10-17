import { IProductCommand } from '@domain/command';
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
