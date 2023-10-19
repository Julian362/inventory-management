import { ProductQuantityValueObject } from '../quantity.value-object';

describe('Cantidad del producto', () => {
  let quantity: ProductQuantityValueObject;

  beforeEach(() => {
    // Arrange and Act
    quantity = new ProductQuantityValueObject(100);
  });

  it(' puede ser creado', () => {
    // Arrange
    expect(quantity).toBeDefined();
  });

  it(' no puede ser creado con una cantidad menor a 0', () => {
    // Arrange
    const value = -1;

    // Act
    const isValid = () => new ProductQuantityValueObject(value);

    // Assert
    expect(isValid).toThrowError(
      'La cantidad del producto debe ser un número positivo',
    );
  });

  it(' si le paso una cantidad válida, no lanza una excepción', () => {
    // Arrange
    const value = 100;

    // Act
    const isValid = new ProductQuantityValueObject(value);

    // Assert
    expect(isValid).toBe(isValid);
  });
});
