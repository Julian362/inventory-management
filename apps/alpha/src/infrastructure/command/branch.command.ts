import { IBranchCommand } from '@domain/command';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsObject, IsString, Length } from 'class-validator';
import { ProductCommand } from './product.command';
import { UserCommand } from './user.command';

export class BranchCommand implements IBranchCommand {
  id?: string;

  @Type(() => ProductCommand)
  product: ProductCommand[];

  @Type(() => UserCommand)
  user: UserCommand[];

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
