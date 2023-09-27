import { IProductDTO, IUserDTO } from '@domain/dto';

export interface IBranchDTO {
  id?: string;
  product: IProductDTO[];
  user: IUserDTO[];
  name: string;
  location: {
    city: string;
    country: string;
  };
}
