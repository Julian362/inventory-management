import { BranchLocationValueObject } from '../location.value-object';

describe('Ubicación de la sucursal', () => {
  describe('validaciones', () => {
    it(' si le paso una ciudad vacía, lanza una excepción', () => {
      // Arrange
      const value = {
        city: '',
        country: 'Colombia',
      };

      // Act
      const isValid = () => new BranchLocationValueObject(value);

      // Assert
      expect(isValid).toThrowError(
        'El campo ciudad de la sucursal no puede estar vacío',
      );
    });

    it(' si le paso un país vacío, lanza una excepción', () => {
      // Arrange
      const value = {
        city: 'Medellín',
        country: '',
      };

      // Act
      const isValid = () => new BranchLocationValueObject(value);

      // Assert
      expect(isValid).toThrowError(
        'El campo país de la sucursal no puede estar vacío',
      );
    });

    it(' si le paso una ciudad con menos de 3 caracteres, lanza una excepción', () => {
      // Arrange
      const value = {
        city: 'Me',
        country: 'Colombia',
      };

      // Act
      const isValid = () => new BranchLocationValueObject(value);

      // Assert
      expect(isValid).toThrowError(
        'El campo ciudad de la sucursal debe tener al menos 3 caracteres',
      );
    });

    it(' si le paso un país con menos de 3 caracteres, lanza una excepción', () => {
      // Arrange
      const value = {
        city: 'Medellín',
        country: 'Co',
      };

      // Act
      const isValid = () => new BranchLocationValueObject(value);

      // Assert
      expect(isValid).toThrowError(
        'El campo país de la sucursal debe tener al menos 3 caracteres',
      );
    });

    it(' si le paso una ciudad con más de 100 caracteres, lanza una excepción', () => {
      // Arrange
      const value = {
        city: 'A'.repeat(101),
        country: 'Colombia',
      };

      // Act
      const isValid = () => new BranchLocationValueObject(value);

      // Assert
      expect(isValid).toThrowError(
        'El campo ciudad de la sucursal no puede superar 100 de caracteres',
      );
    });

    it(' si le paso un país con más de 100 caracteres, lanza una excepción', () => {
      // Arrange
      const value = {
        city: 'Medellín',
        country: 'A'.repeat(101),
      };

      // Act
      const isValid = () => new BranchLocationValueObject(value);

      // Assert
      expect(isValid).toThrowError(
        'El campo país de la sucursal no puede superar 100 de caracteres',
      );
    });

    it(' si le paso una ciudad y un país válidos, no lanza una excepción', () => {
      // Arrange
      const value = {
        city: 'Medellín',
        country: 'Colombia',
      };

      // Act
      const isValid = new BranchLocationValueObject(value);

      // Assert
      expect(isValid).toBe(isValid);
    });
  });
});
