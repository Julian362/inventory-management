import { ProductCommand, UserCommand } from '@infrastructure-command/command';
import { Type } from 'class-transformer';

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
