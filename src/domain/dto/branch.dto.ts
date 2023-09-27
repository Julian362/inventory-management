import { IProductDTO } from './product.dto';
import { IUserDTO } from './user.dto';

export interface IBranchDTO {
  id?: string;
  name: string;
  product: IProductDTO[];
  user: IUserDTO[];
  location: {
    city: string;
    country: string;
  };
}
