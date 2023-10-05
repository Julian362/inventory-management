import { IErrorValueObject, ValueObjectBase } from '@sofka';
import { IsGreaterThanZero } from '@validations';

export class SaleNumberValueObject extends ValueObjectBase<number> {
  validateData(): void {
    if (this.value) {
      this.minQuantity();
    }
  }

  private minQuantity(): void {
    if (!IsGreaterThanZero(this.value)) {
      this.setError({
        field: 'Numero de la factura',
        message:
          'el numero de la factura debe ser un número positivo o igual a 0',
      } as IErrorValueObject);
    }
  }
}
