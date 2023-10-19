import { TypeNamesEnum } from '@enums';
import { SaleTypeValueObject } from '../type.value-object';

describe('Tipo de venta', () => {
  let type: SaleTypeValueObject;

  beforeEach(() => {
    // Arrange and Act
    type = new SaleTypeValueObject(TypeNamesEnum.ChangedProductQuantity);
  });

  it(' puede ser creado', () => {
    // Arrange
    expect(type).toBeDefined();
  });

  it(' no puede ser creado con un tipo de venta vacío', () => {
    // Arrange
    const value = '';

    // Act
    const isValid = () => new SaleTypeValueObject(value);

    // Assert
    expect(isValid).toThrowError('El campo tipo de venta no puede estar vacío');
  });

  it(' no puede ser creado con un tipo de venta inválido', () => {
    // Arrange
    const value = 'invalido';

    // Act
    const isValid = () => new SaleTypeValueObject(value);

    // Assert
    expect(isValid).toThrowError(
      'El campo tipo de venta no es un valor válido',
    );
  });

  it(' si le paso un tipo de venta válido, no lanza una excepción', () => {
    // Arrange
    const value = TypeNamesEnum.ChangedProductQuantity;

    // Act
    const isValid = new SaleTypeValueObject(value);

    // Assert
    expect(isValid).toBe(isValid);
  });
});
