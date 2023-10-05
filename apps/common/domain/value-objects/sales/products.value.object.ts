import { ValueObjectBase } from '@sofka';
import { ProductsType } from '@types';
import {
  ProductNameValueObject,
  ProductPriceValueObject,
  ProductQuantityValueObject,
} from '../product';

export class SaleProductsValueObject extends ValueObjectBase<ProductsType> {
  quantity: ProductQuantityValueObject;
  price: ProductPriceValueObject;
  name: ProductNameValueObject;
  constructor(value: ProductsType) {
    super(value);
  }
  validateData(): void {
    this.quantity = new ProductQuantityValueObject(this.value.quantity);
    this.price = new ProductPriceValueObject(this.value.price);
    this.name = new ProductNameValueObject(this.value.name);
    if (this.value) {
      this.quantity.validateData();
      this.price.validateData();
      this.name.validateData();
    }
  }
}
