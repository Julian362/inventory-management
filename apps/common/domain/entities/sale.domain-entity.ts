import { BranchIdValueObject } from '@domain/value-objects';
import {
  SaleDateValueObject,
  SaleIdValueObject,
  SaleNumberValueObject,
  SaleProductsValueObject,
  SaleTotalValueObject,
} from '@domain/value-objects/sales';
import { ProductsType } from '@types';
import { ISaleDomainEntity } from './interfaces';

export class SaleDomainEntity implements ISaleDomainEntity {
  id: string | SaleIdValueObject;
  number: number | SaleNumberValueObject;
  branchId: string | BranchIdValueObject;
  products: ProductsType[] | SaleProductsValueObject[];
  total: number | SaleTotalValueObject;
  date: SaleDateValueObject | Date;

  constructor(data: ISaleDomainEntity) {
    this.number = data.number;
    this.branchId = data.branchId;
    this.products = data.products;
    this.total = data.total;
    this.date = data.date;
  }
}
