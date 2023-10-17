import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginCommand {
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

  @IsString({
    message: 'La contraseña debe ser una cadena de caracteres',
  })
  @IsNotEmpty({
    message: 'La contraseña es requerida',
  })
  password: string;
}
