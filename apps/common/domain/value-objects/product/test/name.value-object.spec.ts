import { ProductNameValueObject } from '../name.value-object';

describe('nombre del producto', () => {
  let value: ProductNameValueObject;

  beforeEach(() => {
    // Arrange and Act
    value = new ProductNameValueObject('nombre de prueba');
  });

  it('puede ser creado', () => {
    // Assert
    expect(value).toBeDefined();
  });

  describe('validaciones', () => {
    it(' si le paso un nombre vacío, lanza una excepción', () => {
      // Arrange
      const name = '';

      // Act
      const isValid = () => new ProductNameValueObject(name);

      // Assert
      expect(isValid).toThrowError(
        'El campo nombre del producto no puede estar vacío',
      );
    });

    it(' si le paso un nombre con menos de 3 caracteres, lanza una excepción', () => {
      // Arrange
      const name = 'Su';

      // Act
      const isValid = () => new ProductNameValueObject(name);

      // Assert
      expect(isValid).toThrowError(
        'El campo nombre del producto debe tener al menos 3 caracteres',
      );
    });

    it(' si le paso un nombre con más de 30 caracteres, lanza una excepción', () => {
      // Arrange
      const name = 'Sucursal de prueba'.repeat(10);

      // Act
      const isValid = () => new ProductNameValueObject(name);

      // Assert
      expect(isValid).toThrowError(
        'El campo nombre del producto no puede superar 30 de caracteres',
      );
    });

    it(' si le paso un nombre válido, crea el objeto', () => {
      // Arrange
      const name = 'Sucursal de prueba';

      // Act
      const isValid = () => new ProductNameValueObject(name);

      // Assert
      expect(isValid).not.toThrowError();
    });
  });
});
