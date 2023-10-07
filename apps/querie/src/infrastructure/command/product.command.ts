import { IProductCommand } from '@domain/command';

export class ProductCommand implements IProductCommand {
  id: string;

  name: string;

  category: string;

  price: number;

  description: string;

  quantity: number;

  branchId: string;
}
