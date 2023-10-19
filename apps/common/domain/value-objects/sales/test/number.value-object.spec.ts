import { SaleNumberValueObject } from '../number.value-object';

describe('Número de venta', () => {
  let number: SaleNumberValueObject;

  beforeEach(() => {
    // Arrange and Act
    number = new SaleNumberValueObject(1);
  });

  it(' puede ser creado', () => {
    // Arrange
    expect(number).toBeDefined();
  });

  it(' no puede ser creado con un número menor a 0', () => {
    // Arrange
    const value = -1;

    // Act
    const isValid = () => new SaleNumberValueObject(value);

    // Assert
    expect(isValid).toThrowError(
      'el numero de la factura debe ser un número positivo o igual a 0',
    );
  });

  it(' si le paso un número válido, no lanza una excepción', () => {
    // Arrange
    const value = 1;

    // Act
    const isValid = new SaleNumberValueObject(value);

    // Assert
    expect(isValid).toBe(isValid);
  });
});
