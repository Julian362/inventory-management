import { validate } from 'uuid';
import { UserIdValueObject } from '../id.value-object';
describe('id del usuario', () => {
  let id: UserIdValueObject;

  beforeEach(() => {
    // Arrange and Act
    id = new UserIdValueObject();
  });

  it(' puede ser creado', () => {
    // Arrange
    expect(id).toBeDefined();
  });

  describe('validaciones', () => {
    it('si le paso un indefinido me crea un uuid', () => {
      // Arrange
      const value = undefined;

      // Act
      const isValid = new UserIdValueObject(value);

      // Assert
      expect(isValid).toBeDefined();
      expect(validate(isValid.valueOf())).toBe(true);
    });

    it(' si no le paso un uuid valido, lanza una excepción', () => {
      // Arrange
      const value = 'invalid-uuid';

      // Act
      const isValid = () => new UserIdValueObject(value);

      // Assert
      expect(isValid).toThrowError(
        'El campo id del usuario debe ser un uuid válido',
      );
    });

    it(' si le paso un uuid valido, no lanza una excepción', () => {
      // Arrange
      const value = 'd1e5e1d2-7a43-4c6c-9e9b-0d2b3f5d0c4b';

      // Act
      const isValid = new UserIdValueObject(value);

      // Assert
      expect(isValid).toBe(isValid);
    });
  });
});
