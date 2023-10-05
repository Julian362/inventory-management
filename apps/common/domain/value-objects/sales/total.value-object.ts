import { IErrorValueObject, ValueObjectBase } from '@sofka';
import { IsPositiveNumber } from '@validations';

export class SaleTotalValueObject extends ValueObjectBase<number> {
  validateData(): void {
    if (this.value) {
      this.minPrice();
    }
  }

  private minPrice(): void {
    if (!IsPositiveNumber(this.value)) {
      this.setError({
        field: 'precio total de la venta',
        message: 'El precio total de la venta debe ser un número positivo',
      } as IErrorValueObject);
    }
  }
}
