import { RolesUserEnum } from '@enums';
import { IErrorValueObject, ValueObjectBase } from '@sofka';
import { EnumContains, IsEmpty } from '@validations';

export class UserRolValueObject extends ValueObjectBase<string> {
  validateData(): void {
    this.isEmpty();
    if (this.value) {
      this.containEnumRol();
    }
  }

  private containEnumRol(): void {
    if (!EnumContains(this.value, RolesUserEnum)) {
      this.setError({
        field: 'rol del usuario',
        message: `El campo rol del usuario no es un valor válido, los valores válidos son: ${RolesUserEnum.Admin}, ${RolesUserEnum.employee}, ${RolesUserEnum.SuperAdmin}`,
      } as IErrorValueObject);
    }
  }

  private isEmpty(): void {
    if (IsEmpty(this.value)) {
      this.setError({
        field: 'rol del usuario',
        message: `El campo rol del usuario no puede estar vacío`,
      } as IErrorValueObject);
    }
  }
}
