import {
  BranchIdValueObject,
  ProductCategoryValueObject,
  ProductDescriptionValueObject,
  ProductNameValueObject,
  ProductPriceValueObject,
  ProductQuantityValueObject,
} from '@domain/value-objects';

export class ProductDomainEntity {
  id?: string;
  name: string;
  category: string;
  price: number;
  description: string;
  quantity: number;
  branchId: string;

  constructor(data: ProductDomainEntity) {
    this.name = new ProductNameValueObject(data.name).valueOf();
    this.category = new ProductCategoryValueObject(data.category).valueOf();
    this.price = new ProductPriceValueObject(data.price).valueOf();
    this.description = new ProductDescriptionValueObject(
      data.description,
    ).valueOf();
    this.quantity = new ProductQuantityValueObject(data.quantity).valueOf();
    this.branchId = new BranchIdValueObject(data.branchId).valueOf();
  }
}
