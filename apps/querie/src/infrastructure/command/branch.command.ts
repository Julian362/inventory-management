import { UserCommand } from '@infrastructure-command/command';
import { Type } from 'class-transformer';
import { ProductCommand } from './product.command';

export class BranchCommandQuerie {
  id?: string;

  @Type(() => ProductCommand)
  product: ProductCommand[];

  @Type(() => UserCommand)
  user: UserCommand[];

  name: string;

  location: string;
}
