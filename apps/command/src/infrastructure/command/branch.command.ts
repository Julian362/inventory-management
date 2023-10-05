import { Type } from 'class-transformer';
import { ProductCommand } from './product.command';
import { UserCommand } from './user.command';

export class BranchCommand {
  id?: string;

  @Type(() => ProductCommand)
  product: ProductCommand[];

  @Type(() => UserCommand)
  user: UserCommand[];

  name: string;

  location: {
    city: string;
    country: string;
  };
}
