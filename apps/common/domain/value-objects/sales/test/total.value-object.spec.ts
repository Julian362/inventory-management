import { SaleTotalValueObject } from '../total.value-object';

describe('Total de la venta', () => {
  let total: SaleTotalValueObject;

  beforeEach(() => {
    // Arrange and Act
    total = new SaleTotalValueObject(1000);
  });

  it(' puede ser creado', () => {
    // Arrange
    expect(total).toBeDefined();
  });

  it(' no puede ser creado con un total menor a 0', () => {
    // Arrange
    const value = -1;

    // Act
    const isValid = () => new SaleTotalValueObject(value);

    // Assert
    expect(isValid).toThrowError(
      'El precio total de la venta debe ser un número positivo',
    );
  });

  it(' si le paso un total válido, no lanza una excepción', () => {
    // Arrange
    const value = 1000;

    // Act
    const isValid = new SaleTotalValueObject(value);

    // Assert
    expect(isValid).toBe(isValid);
  });
});
