import { StringValueObjectBase } from '@ValueObjectBase';
import { ValueObjectBase } from '@sofka';
import { FullNameType } from '@types';

export class UserNameValueObject extends ValueObjectBase<FullNameType> {
  firstName: FirstName;
  lastName: LastName;

  validateData(): void {
    this.firstName = new FirstName(this.value.FirstName);
    this.lastName = new LastName(this.value.LastName);
    if (this.value) {
      this.firstName.validateData();
      this.lastName.validateData();
    }
  }
}

export class FirstName extends StringValueObjectBase {
  getFieldName() {
    return 'primer nombre del usuario';
  }
  getMaxLength() {
    return 100;
  }
  getMinLength() {
    return 3;
  }
}

export class LastName extends StringValueObjectBase {
  getFieldName() {
    return 'apellido del usuario';
  }
  getMaxLength() {
    return 100;
  }
  getMinLength() {
    return 3;
  }
}
