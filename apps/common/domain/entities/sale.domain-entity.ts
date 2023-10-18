import { BranchIdValueObject } from '@domain/value-objects';
import {
  SaleDateValueObject,
  SaleNumberValueObject,
  SaleProductsValueObject,
  SaleTotalValueObject,
  SaleTypeValueObject,
} from '@domain/value-objects/sales';
import { ProductsType } from '@types';

export class SaleDomainEntity {
  id?: string;
  number: number;
  branchId: string;
  products: ProductsType[];
  total: number;
  date: Date;
  type: string;

  constructor(data: SaleDomainEntity) {
    this.number = new SaleNumberValueObject(data.number).valueOf();
    this.branchId = new BranchIdValueObject(data.branchId).valueOf();
    data.products.map(
      (product: ProductsType) => new SaleProductsValueObject(product),
    );
    this.products = data.products;
    this.total = new SaleTotalValueObject(data.total).valueOf();
    this.date = new SaleDateValueObject(data.date).valueOf();
    this.type = new SaleTypeValueObject(data.type).valueOf();
  }
}
