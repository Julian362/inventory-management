import { StringValueObjectBase } from '@ValueObjectBase';

export class BranchNameValueObject extends StringValueObjectBase {
  constructor(value: string) {
    super(value);
  }
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
