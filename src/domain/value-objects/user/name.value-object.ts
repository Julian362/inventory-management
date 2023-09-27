import { StringValueObjectBase } from '@ValueObjectBase';

export class UserNameValueObject extends StringValueObjectBase {
  getFieldName() {
    return 'nombre del usuario';
  }
  getMaxLength() {
    return 100;
  }
  getMinLength() {
    return 3;
  }
}
