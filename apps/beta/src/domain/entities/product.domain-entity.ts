import {
  ProductCategoryValueObject,
  ProductDescriptionValueObject,
  ProductIdValueObject,
  ProductNameValueObject,
  ProductPriceValueObject,
  ProductQuantityValueObject,
} from '@domain/value-objects';
import { IProductDomainEntity } from './interfaces';

export class ProductDomainEntity implements IProductDomainEntity {
  id?: string | ProductIdValueObject;
  name: string | ProductNameValueObject;
  category: string | ProductCategoryValueObject;
  price: number | ProductPriceValueObject;
  description: string | ProductDescriptionValueObject;
  quantity: number | ProductQuantityValueObject;
  branchId: string | ProductIdValueObject;

  constructor(data: IProductDomainEntity) {
    this.name = data.name;
    this.category = data.category;
    this.price = data.price;
    this.description = data.description;
    this.quantity = data.quantity;
  }
}
