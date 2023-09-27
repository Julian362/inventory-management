import { IErrorValueObject, ValueObjectBase } from '@sofka';
import { EnumContains, IsEmpty } from '@validations';
import { ProductCategory } from 'src/shared/enums';

export class ProductCategoryValueObject extends ValueObjectBase<string> {
  validateData(): void {
    if (this.value) {
      this.containEnumCategory();
      this.isEmpty();
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
    if (!IsEmpty(this.value)) {
      this.setError({
        field: 'categoría del producto',
        message: `El campo categoría del producto no puede estar vacío`,
      } as IErrorValueObject);
    }
  }
}
