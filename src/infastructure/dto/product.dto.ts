import { IProductDTO } from '@domain/dto';

export class ProductDTO implements IProductDTO {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  quantity: number;
}
