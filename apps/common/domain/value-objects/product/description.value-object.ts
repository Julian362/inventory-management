import { StringValueObjectBase } from '@ValueObjectBase';

export class ProductDescriptionValueObject extends StringValueObjectBase {
  getFieldName(): string {
    return 'descripción del producto';
  }

  getMaxLength(): number {
    return 300;
  }

  getMinLength(): number {
    return 3;
  }
}
