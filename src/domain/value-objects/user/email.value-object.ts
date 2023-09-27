import { IErrorValueObject, ValueObjectBase } from '@sofka';
import { IsEmail, IsEmpty, StringMaxLength } from '@validations';

export class UserEmailValueObject extends ValueObjectBase<string> {
  validateData(): void {
    if (this.value) {
      this.isEmpty();
      this.ValidateStructure();
      this.maxLength();
    }
  }

  private ValidateStructure() {
    if (!IsEmail(this.value)) {
      this.setError({
        field: 'email',
        message: `El email del usuario no tiene un formato válido`,
      } as IErrorValueObject);
    }
  }

  private isEmpty(): boolean {
    if (IsEmpty(this.value)) {
      this.setError({
        field: 'email',
        message: `El email del usuario no puede estar vacío`,
      } as IErrorValueObject);
      return true;
    }
    return false;
  }

  private maxLength() {
    if (StringMaxLength(this.value, 150)) {
      this.setError({
        field: 'email',
        message: `El email del usuario no puede tener más de 150 caracteres`,
      } as IErrorValueObject);
    }
  }
}
