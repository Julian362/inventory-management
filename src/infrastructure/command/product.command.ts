import { IProductCommand } from '@domain/command';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  Length,
  Min,
} from 'class-validator';

export class ProductCommand implements IProductCommand {
  id?: string;

  @IsString()
  @IsNotEmpty()
  @Length(3, 30)
  name: string;

  @IsString()
  @IsNotEmpty()
  @Length(3, 30)
  category: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsString()
  @IsNotEmpty()
  @Length(3, 300)
  description: string;

  @IsNumber()
  @Min(0)
  quantity: number;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  branchId: string;
}
