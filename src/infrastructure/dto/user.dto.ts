import { IUserDTO } from '@domain/dto';
import {
  IsEmail,
  IsNotEmpty,
  IsObject,
  IsString,
  IsUUID,
  Length,
  Matches,
} from 'class-validator';

export class UserDTO implements IUserDTO {
  id?: string;
  @IsObject()
  name: {
    firstName: string;
    lastName: string;
  };

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

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  branchId: string;
}
