import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ITokenCommand } from '../../domain/command/';
export class TokenCommand implements ITokenCommand {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @IsNotEmpty()
  @IsString()
  token: string;
}
