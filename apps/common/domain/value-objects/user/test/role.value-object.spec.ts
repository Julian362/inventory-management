import { RolesUserEnum } from '@enums';
import { UserRolValueObject } from '../role.value-object';

describe('role del usuario', () => {
  let role: UserRolValueObject;

  beforeEach(() => {
    // Arrange and Act
    role = new UserRolValueObject(RolesUserEnum.Admin);
  });

  it(' puede ser creado', () => {
    // Arrange
    expect(role).toBeDefined();
  });

  it(' si no le paso un rol valido, lanza una excepción', () => {
    // Arrange
    const value = 'invalid-rol';

    // Act
    const isValid = () => new UserRolValueObject(value);

    // Assert
    expect(isValid).toThrowError(
      'El campo rol del usuario no es un valor válido, los valores válidos son: admin, employee, superAdmin',
    );
  });
  it(' si le paso un rol vació, lanza una excepción', () => {
    // Arrange
    const value = '';

    // Act
    const isValid = () => new UserRolValueObject(value);

    // Assert
    expect(isValid).toThrowError(
      'El campo rol del usuario no puede estar vacío',
    );
  });
  it(' si le paso un rol valido, no lanza una excepción', () => {
    // Arrange
    const value = RolesUserEnum.Admin;

    // Act
    const isValid = new UserRolValueObject(value);

    // Assert
    expect(isValid).toBe(isValid);
  });
});
