import { SaleDateValueObject } from '../date.value-object';

describe('Fecha de venta', () => {
  let date: SaleDateValueObject;

  beforeEach(() => {
    // Arrange and Act

    date = new SaleDateValueObject(new Date());
  });

  it(' puede ser creado', () => {
    // Arrange
    expect(date).toBeDefined();
  });

  it(' no puede ser creado con una fecha mayor a la fecha actual', () => {
    // Arrange
    const value = new Date('2021-05-01');

    // Act
    const isValid = () => new SaleDateValueObject(value);

    // Assert
    expect(isValid).toThrowError(
      'La fecha de la venta no puede ser mayor a la fecha actual',
    );
  });

  it(' si le paso una fecha válida, no lanza una excepción', () => {
    // Arrange
    const value = new Date();

    // Act
    const isValid = new SaleDateValueObject(value);

    // Assert
    expect(isValid).toBe(isValid);
  });
});
