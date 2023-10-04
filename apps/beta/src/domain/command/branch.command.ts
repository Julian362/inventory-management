import { IProductCommand } from './product.command';
import { IUserCommand } from './user.command';

export interface IBranchCommand {
  id?: string;
  name: string;
  product: IProductCommand[];
  user: IUserCommand[];
  location: {
    city: string;
    country: string;
  };
}
