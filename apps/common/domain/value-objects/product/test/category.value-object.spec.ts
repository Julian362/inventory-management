import { ProductCategory } from '@enums';
import { ProductCategoryValueObject } from '../category.value-object';

describe('Categoría del producto', () => {
  let category: ProductCategoryValueObject;

  beforeEach(() => {
    // Arrange and Act
    category = new ProductCategoryValueObject(
      ProductCategory.ConstructionHardware,
    );
  });

  it(' puede ser creado', () => {
    // Arrange
    expect(category).toBeDefined();
  });

  it(' no puede ser creado con una categoría vacía', () => {
    // Arrange
    const value = '';

    // Act
    const isValid = () => new ProductCategoryValueObject(value);

    // Assert
    expect(isValid).toThrowError(
      'El campo categoría del producto no puede estar vacío',
    );
  });

  it(' no puede ser creado con una categoría inválida', () => {
    // Arrange
    const value = 'invalido';

    // Act
    const isValid = () => new ProductCategoryValueObject(value);

    // Assert
    expect(isValid).toThrowError(
      'El campo categoría del producto no es un valor válido',
    );
  });

  it(' si le paso una categoría válida, no lanza una excepción', () => {
    // Arrange
    const value = ProductCategory.ConstructionHardware;

    // Act
    const isValid = new ProductCategoryValueObject(value);

    // Assert
    expect(isValid).toBe(isValid);
  });
});
