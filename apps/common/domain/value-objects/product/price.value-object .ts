import { IErrorValueObject, ValueObjectBase } from '@sofka';
import { IsPositiveNumber } from '@validations';

export class ProductPriceValueObject extends ValueObjectBase<number> {
  validateData(): void {
    if (this.value) {
      this.minPrice();
    }
  }

  private minPrice(): void {
    if (!IsPositiveNumber(this.value)) {
      this.setError({
        field: 'precio del producto',
        message: 'El precio del producto debe ser un número positivo',
      } as IErrorValueObject);
    }
  }
}
