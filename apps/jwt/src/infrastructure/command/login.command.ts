import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginCommand {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
