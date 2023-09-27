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
  name?: string | ProductNameValueObject;
  category?: string | ProductCategoryValueObject;
  price?: number | ProductPriceValueObject;
  description?: string | ProductDescriptionValueObject;
  quantity?: number | ProductQuantityValueObject;
  branchId?: string | ProductIdValueObject;

  constructor(data: IProductDomainEntity) {
    if (data?.name) this.name = data.name;
    if (data?.category) this.category = data.category;
    if (data?.price) this.price = data.price;
    if (data?.description) this.description = data.description;
    if (data?.quantity) this.quantity = data.quantity;
  }
}
