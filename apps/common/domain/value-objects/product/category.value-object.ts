import { ProductCategory } from '@enums';
import { IErrorValueObject, ValueObjectBase } from '@sofka';
import { EnumContains, IsEmpty } from '@validations';

export class ProductCategoryValueObject extends ValueObjectBase<string> {
  validateData(): void {
    this.isEmpty();
    if (this.value) {
      this.containEnumCategory();
    }
  }

  private containEnumCategory(): void {
    if (!EnumContains(this.value, ProductCategory)) {
      this.setError({
        field: 'categoría del producto',
        message: `El campo categoría del producto no es un valor válido`,
      } as IErrorValueObject);
    }
  }

  private isEmpty(): void {
    if (IsEmpty(this.value)) {
      this.setError({
        field: 'categoría del producto',
        message: `El campo categoría del producto no puede estar vacío`,
      } as IErrorValueObject);
    }
  }
}
