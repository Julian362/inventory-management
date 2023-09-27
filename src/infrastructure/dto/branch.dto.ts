import { IBranchDTO } from '@domain/dto';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsObject, IsString, Length } from 'class-validator';
import { ProductDTO } from './product.dto';
import { UserDTO } from './user.dto';

export class BranchDTO implements IBranchDTO {
  id?: string;

  @Type(() => ProductDTO)
  product: ProductDTO[];

  @Type(() => UserDTO)
  user: UserDTO[];

  @IsString()
  @IsNotEmpty()
  @Length(3, 30)
  name: string;

  @IsObject()
  location: {
    city: string;
    country: string;
  };
}
