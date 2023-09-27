import { IUserDTO } from '@domain/dto';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class UserDTO implements IUserDTO {
  id?: string;
  @IsString()
  @IsNotEmpty()
  @Length(3, 30)
  name: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 20)
  @Matches(
    /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/,
  )
  password: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @Length(5, 150)
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(3, 30)
  role: string;
}
