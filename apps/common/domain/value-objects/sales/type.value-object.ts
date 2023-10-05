import { TypeNamesEnum } from '@enums';
import { IErrorValueObject, ValueObjectBase } from '@sofka';
import { EnumContains, IsEmpty } from '@validations';

export class SaleTypeValueObject extends ValueObjectBase<string> {
  validateData(): void {
    if (this.value) {
      this.containEnumCategory();
      this.isEmpty();
    }
  }

  private containEnumCategory(): void {
    if (!EnumContains(this.value, TypeNamesEnum)) {
      this.setError({
        field: 'tipo de venta',
        message: `El campo tipo de venta no es un valor válido`,
      } as IErrorValueObject);
    }
  }

  private isEmpty(): void {
    if (IsEmpty(this.value)) {
      this.setError({
        field: 'tipo de venta',
        message: `El campo tipo de venta no puede estar vacío`,
      } as IErrorValueObject);
    }
  }
}
