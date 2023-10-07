import { IUserCommand } from '@domain/command';
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
  @IsString()
  @IsNotEmpty()
  @Length(3, 30)
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @Length(3, 30)
  lastName: string;
}
export class UserCommand implements IUserCommand {
  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => Name)
  name: Name;

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
  @IsIn(['admin', 'employee', 'superAdmin'])
  role: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  branchId: string;
}
