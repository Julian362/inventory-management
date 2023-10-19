import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDefined,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';
class Location {
  @Length(3, 30, {
    message: 'El nombre de la ciudad debe tener entre 3 y 30 caracteres',
  })
  @IsNotEmpty({ message: 'El nombre del país es requerido' })
  @IsString({ message: 'El nombre del país debe ser una cadena de caracteres' })
  city: string;
  @Length(3, 30, {
    message: 'El nombre del país debe tener entre 3 y 30 caracteres',
  })
  @IsNotEmpty({
    message: 'El nombre del país es requerido',
  })
  @IsString({
    message: 'El nombre del país debe ser una cadena de caracteres',
  })
  country: string;
}
export class BranchCommand {
  @ApiProperty({
    description: 'Id de la sucursal',
    example: 'fdca7a8e-9585-4890-9d57-84a88820ae52',
  })
  @Length(3, 30, {
    message: 'El nombre de la sucursal debe tener entre 3 y 30 caracteres',
  })
  @IsNotEmpty({
    message: 'El nombre de la sucursal es requerido',
  })
  @IsString({
    message: 'El nombre de la sucursal debe ser una cadena de caracteres',
  })
  name: string;

  @ApiProperty({
    description: 'Ubicación de la sucursal',
    example: {
      city: 'Medellin',
      country: 'Colombia',
    },
  })
  @IsDefined({
    message: 'La ubicación de la sucursal es requerida',
  })
  @IsNotEmptyObject()
  @IsObject({
    message: 'La ubicación de la sucursal debe ser un objeto',
  })
  @ValidateNested({
    each: true,
    message: 'La ubicación de la sucursal debe ser un objeto',
  })
  @Type(() => Location)
  location: Location;
}
