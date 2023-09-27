import { StringValueObjectBase } from '@ValueObjectBase';

export class BranchNameValueObject extends StringValueObjectBase {
  getFieldName(): string {
    return 'nombre de la sucursal';
  }

  getMaxLength(): number {
    return 100;
  }

  getMinLength(): number {
    return 3;
  }
}
