import {
  ProductCategoryValueObject,
  ProductDescriptionValueObject,
  ProductIdValueObject,
  ProductNameValueObject,
  ProductPriceValueObject,
  ProductQuantityValueObject,
} from '@domain/value-objects';

export interface IProductDomainEntity {
  id?: string | ProductIdValueObject;
  name: string | ProductNameValueObject;
  category: string | ProductCategoryValueObject;
  price: number | ProductPriceValueObject;
  description: string | ProductDescriptionValueObject;
  quantity: number | ProductQuantityValueObject;
  branchId: string | ProductIdValueObject;
}
