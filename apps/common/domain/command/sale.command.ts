export interface ISaleCommand {
  products: IProductTypeCommand[];
  branchId: string;
}
export interface IProductTypeCommand {
  id: string;
  quantity: number;
}
