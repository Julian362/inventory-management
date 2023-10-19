import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginCommand {
  @ApiProperty({
    description: 'Email del usuario',
    example: 'email@email.com',
  })
  @IsEmail(
    {},
    {
      message: 'El email debe ser un email válido',
    },
  )
  @IsString({
    message: 'El email debe ser una cadena de caracteres',
  })
  @IsNotEmpty({
    message: 'El email es requerido',
  })
  email: string;

  @ApiProperty({
    description: 'Contraseña del usuario',
  })
  @IsString({
    message: 'La contraseña debe ser una cadena de caracteres',
  })
  @IsNotEmpty({
    message: 'La contraseña es requerida',
  })
  password: string;
}
