import { IUserCommand } from '@domain/command';
import { RolesUserEnum } from '@enums';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDefined,
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  IsString,
  IsUUID,
  Length,
  Matches,
  ValidateNested,
} from 'class-validator';
class Name {
  @IsString({
    message: 'El nombre debe ser una cadena de caracteres',
  })
  @IsNotEmpty({
    message: 'El nombre es requerido',
  })
  @Length(3, 30, {
    message: 'El nombre debe tener entre 3 y 30 caracteres',
  })
  firstName: string;

  @IsString({
    message: 'El apellido debe ser una cadena de caracteres',
  })
  @IsNotEmpty({
    message: 'El apellido es requerido',
  })
  @Length(3, 30, {
    message: 'El apellido debe tener entre 3 y 30 caracteres',
  })
  lastName: string;
}
export class UserCommand implements IUserCommand {
  @ApiProperty({
    description: 'nombre del usuario',
    example: {
      firstName: 'Juan',
      lastName: 'Perez',
    },
  })
  @IsDefined({
    message: 'El nombre es requerido',
  })
  @IsNotEmptyObject()
  @IsObject({
    message: 'El nombre debe ser un objeto',
  })
  @ValidateNested({ each: true })
  @Type(() => Name)
  fullName: Name;

  @ApiProperty({
    description: 'Contraseña del usuario',
    example: 'Password123',
  })
  @IsString({
    message: 'La contraseña debe ser una cadena de caracteres',
  })
  @IsNotEmpty({
    message: 'La contraseña es requerida',
  })
  @Length(8, 20, {
    message: 'La contraseña debe tener entre 8 y 20 caracteres',
  })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,16}$/, {
    message:
      'La contraseña debe tener al menos una letra mayúscula, una minúscula y un número',
  })
  password: string;

  @ApiProperty({
    description: 'Correo electrónico del usuario',
    example: 'email@email.com',
  })
  @IsString({
    message: 'El correo electrónico debe ser una cadena de caracteres',
  })
  @IsNotEmpty({
    message: 'El correo electrónico es requerido',
  })
  @IsEmail(
    {},
    {
      message: 'El correo electrónico debe ser un email válido',
    },
  )
  @Length(5, 150, {
    message: 'El correo electrónico debe tener entre 5 y 150 caracteres',
  })
  email: string;

  @ApiProperty({
    description: 'Rol del usuario',
    example: RolesUserEnum.Admin,
  })
  @IsString({
    message: 'El rol debe ser una cadena de caracteres',
  })
  @IsNotEmpty({
    message: 'El rol es requerido',
  })
  @IsIn(['admin', 'employee', 'superAdmin'], {
    message: 'El rol debe ser admin, employee o superAdmin',
  })
  role: string;

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
