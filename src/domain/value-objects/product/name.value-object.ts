import { StringValueObjectBase } from '@ValueObjectBase';

export class ProductNameValueObject extends StringValueObjectBase {
  getMinLength(): number {
    return 3;
  }

  getMaxLength(): number {
    return 30;
  }

  getFieldName(): string {
    return 'nombre del producto';
  }
}
