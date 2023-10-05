import { ValueObjectBase } from '@sofka';
import { CurrentDateTimeValidation } from '@validations';

export class SaleDateValueObject extends ValueObjectBase<Date> {
  validateData(): void {
    if (this.value) {
      this.validateDate();
    }
  }
  constructor(value: Date) {
    super(value);
  }

  private validateDate(): void {
    if (!CurrentDateTimeValidation(this.value, new Date())) {
      this.setError({
        field: 'fecha de la venta',
        message: `La fecha de la venta no puede ser mayor a la fecha actual`,
      });
    }
  }
}
