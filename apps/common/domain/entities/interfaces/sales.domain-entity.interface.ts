import { BranchIdValueObject } from '@domain/value-objects';
import {
  SaleDateValueObject,
  SaleIdValueObject,
  SaleNumberValueObject,
  SaleProductsValueObject,
  SaleTotalValueObject,
} from '@domain/value-objects/sales';
import { ProductsType } from '@types';

export interface ISalesDomainEntity {
  id: string | SaleIdValueObject;
  number: number | SaleNumberValueObject;
  branchId: string | BranchIdValueObject;
  products: ProductsType[] | SaleProductsValueObject[];
  total: number | SaleTotalValueObject;
  date: Date | SaleDateValueObject;
}
