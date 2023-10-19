import { ProductPriceValueObject } from '../price.value-object ';

describe('Precio del producto', () => {
  let price: ProductPriceValueObject;

  beforeEach(() => {
    // Arrange and Act
    price = new ProductPriceValueObject(100);
  });

  it(' puede ser creado', () => {
    // Arrange
    expect(price).toBeDefined();
  });
  it(' no puede ser creado con un precio menor a 0', () => {
    // Arrange
    const value = -1;

    // Act
    const isValid = () => new ProductPriceValueObject(value);

    // Assert
    expect(isValid).toThrowError(
      'El precio del producto debe ser un número positivo',
    );
  });

  it(' si le paso un precio válido, no lanza una excepción', () => {
    // Arrange
    const value = 100;

    // Act
    const isValid = new ProductPriceValueObject(value);

    // Assert
    expect(isValid).toBe(isValid);
  });
});
