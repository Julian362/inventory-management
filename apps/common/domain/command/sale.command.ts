import { TypeNamesEnum } from '@enums';

export interface ISaleCommand {
  products: IProductTypeCommand[];
  type:
    | TypeNamesEnum.RegisteredCustomerSale
    | TypeNamesEnum.RegisteredSellerSale;
  branchId: string;
}
export interface IProductTypeCommand {
  id: string;
  quantity: number;
}
