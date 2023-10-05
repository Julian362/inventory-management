import { BranchIdValueObject } from '@domain/value-objects';
import {
  SaleDateValueObject,
  SaleNumberValueObject,
  SaleProductsValueObject,
  SaleTotalValueObject,
} from '@domain/value-objects/sales';
import { ProductsType } from '@types';
import { ISalesDomainEntity } from './interfaces';

export class SaleDomainEntity implements ISalesDomainEntity {
  id: string | SaleDateValueObject;
  number: number | SaleNumberValueObject;
  branchId: string | BranchIdValueObject;
  products: ProductsType[] | SaleProductsValueObject[];
  total: number | SaleTotalValueObject;
  date: SaleDateValueObject | Date;

  constructor(data: ISalesDomainEntity) {
    this.number = data.number;
    this.branchId = data.branchId;
    this.products = data.products;
    this.total = data.total;
    this.date = data.date;
  }
}
