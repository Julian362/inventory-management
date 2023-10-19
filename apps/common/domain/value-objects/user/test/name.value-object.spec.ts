import { UserNameValueObject } from '../name.value-object';

describe('nombre del producto', () => {
  let value: UserNameValueObject;

  beforeEach(() => {
    // Arrange and Act
    value = new UserNameValueObject({
      firstName: 'nombre',
      lastName: 'de prueba',
    });
  });

  it('puede ser creado', () => {
    // Assert
    expect(value).toBeDefined();
  });

  describe('validaciones', () => {
    it(' si le paso un nombre vacío, lanza una excepción', () => {
      // Arrange
      const name = {} as any;

      // Act
      const isValid = () => new UserNameValueObject(name);

      // Assert
      expect(isValid).toThrowError(
        'El campo primer nombre del usuario no puede estar vacío',
      );
    });

    it(' si le paso un nombre con menos de 3 caracteres, lanza una excepción', () => {
      // Arrange
      const name = {
        firstName: 'Su',
        lastName: 'de prueba',
      };

      // Act
      const isValid = () => new UserNameValueObject(name);

      // Assert
      expect(isValid).toThrowError(
        'El campo primer nombre del usuario debe tener al menos 3 caracteres',
      );
    });

    it(' si le paso un apellido con más de 100 caracteres, lanza una excepción', () => {
      // Arrange
      const name = {
        firstName: 'nombre',
        lastName: 'de prueba'.repeat(100),
      };

      // Act
      const isValid = () => new UserNameValueObject(name);

      // Assert
      expect(isValid).toThrowError(
        'El campo apellido del usuario no puede superar 100 de caracteres',
      );
    });

    it(' si le paso un apellido vacío, lanza una excepción', () => {
      // Arrange
      const name = {
        firstName: 'nombre',
        lastName: '',
      };

      // Act
      const isValid = () => new UserNameValueObject(name);

      // Assert
      expect(isValid).toThrowError(
        'El campo apellido del usuario no puede estar vacío',
      );
    });

    it(' si le paso un apellido con menos de 3 caracteres, lanza una excepción', () => {
      // Arrange
      const name = {
        firstName: 'nombre',
        lastName: 'de',
      };

      // Act
      const isValid = () => new UserNameValueObject(name);

      // Assert
      expect(isValid).toThrowError(
        'El campo apellido del usuario debe tener al menos 3 caracteres',
      );
    });

    it(' si le paso un apellido con más de 100 caracteres, lanza una excepción', () => {
      // Arrange
      const name = {
        firstName: 'nombre',
        lastName: 'de prueba'.repeat(100),
      };

      // Act
      const isValid = () => new UserNameValueObject(name);

      // Assert
      expect(isValid).toThrowError(
        'El campo apellido del usuario no puede superar 100 de caracteres',
      );
    });

    it(' si le paso un nombre válido, crea el objeto', () => {
      // Arrange
      const name = {
        firstName: 'nombre',
        lastName: 'de prueba',
      };

      // Act
      const isValid = () => new UserNameValueObject(name);

      // Assert
      expect(isValid).not.toThrowError();
    });
  });
});
