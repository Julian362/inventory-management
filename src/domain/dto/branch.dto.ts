import { IBranchDTO, ProductDTO, UserDTO } from 'src/infastructure/dto';

export class BranchDTO implements IBranchDTO {
  id?: string;
  product: ProductDTO[];
  user: UserDTO[];
  name: string;
  location: {
    city: string;
    country: string;
  };
}
