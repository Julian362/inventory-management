export interface IProductDTO {
  id?: string;
  name: string;
  category: string;
  price: number;
  description: string;
  quantity: number;
  branchId?: string;
}
