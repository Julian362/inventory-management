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
  @Length(3, 30)
  @IsNotEmpty()
  @IsString()
  city: string;
  @Length(3, 30)
  @IsNotEmpty()
  @IsString()
  country: string;
}
export class BranchCommand {
  @Length(3, 30)
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => Location)
  location: Location;
}
