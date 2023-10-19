import { BranchNameValueObject } from '../name.value-object';

describe('nombre de la sucursal', () => {
  let value: BranchNameValueObject;

  beforeEach(() => {
    // Arrange and Act
    value = new BranchNameValueObject('Sucursal de prueba');
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
      const isValid = () => new BranchNameValueObject(name);

      // Assert
      expect(isValid).toThrowError(
        'El campo nombre de la sucursal no puede estar vacío',
      );
    });

    it(' si le paso un nombre con menos de 3 caracteres, lanza una excepción', () => {
      // Arrange
      const name = 'Su';

      // Act
      const isValid = () => new BranchNameValueObject(name);

      // Assert
      expect(isValid).toThrowError(
        'El campo nombre de la sucursal debe tener al menos 3 caracteres',
      );
    });

    it(' si le paso un nombre con más de 100 caracteres, lanza una excepción', () => {
      // Arrange
      const name = 'Sucursal de prueba'.repeat(10);

      // Act
      const isValid = () => new BranchNameValueObject(name);

      // Assert
      expect(isValid).toThrowError(
        'El campo nombre de la sucursal no puede superar 100 de caracteres',
      );
    });

    it(' si le paso un nombre válido, crea el objeto', () => {
      // Arrange
      const name = 'Sucursal de prueba';

      // Act
      const isValid = () => new BranchNameValueObject(name);

      // Assert
      expect(isValid).not.toThrowError();
    });
  });
});
