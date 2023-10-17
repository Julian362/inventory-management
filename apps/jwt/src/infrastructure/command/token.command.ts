import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ITokenCommand } from '../../domain/command/';
export class TokenCommand implements ITokenCommand {
  @IsString({
    message: 'El id debe ser una cadena de caracteres',
  })
  @IsNotEmpty({
    message: 'El id es requerido',
  })
  @IsUUID('all', {
    message: 'El id debe ser un UUID válido',
  })
  id: string;

  @IsNotEmpty({
    message: 'El token es requerido',
  })
  @IsString({
    message: 'El token debe ser una cadena de caracteres',
  })
  token: string;
}
