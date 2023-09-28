import { IErrorValueObject, ValueObjectBase } from '@sofka';
import { IsGreaterThanZero } from '@validations';

export class ProductQuantityValueObject extends ValueObjectBase<number> {
  validateData(): void {
    if (this.value) {
      this.minQuantity();
    }
  }

  private minQuantity(): void {
    if (!IsGreaterThanZero(this.value)) {
      this.setError({
        field: 'cantidad del producto',
        message:
          'La cantidad del producto debe ser un número positivo o igual a 0',
      } as IErrorValueObject);
    }
  }
}
