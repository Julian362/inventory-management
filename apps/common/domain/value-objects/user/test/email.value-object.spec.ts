import { UserEmailValueObject } from '../email.value-object';

describe('Email', () => {
  let email: UserEmailValueObject;

  beforeEach(() => {
    //Arrange and Act
    email = new UserEmailValueObject('email@email.com');
  });

  it('puede ser creado', () => {
    //Assert
    expect(email).toBeTruthy();
  });

  it('debe validar que el email no sea vacío', () => {
    //Arrange
    const value = '';
    //Act
    const result = () => new UserEmailValueObject(value);

    //Assert
    expect(result).toThrowError('El email del usuario no puede estar vacío');
  });

  it('debe validar que el email no sea mayor a 150 caracteres', () => {
    //Arrange
    const value = 'example1@example.com'.repeat(15);

    //Act
    const result = () => new UserEmailValueObject(value);

    //Assert
    expect(result).toThrowError(
      'El email del usuario no puede tener más de 150 caracteres',
    );
  });

  it('debe validar que el email tenga un formato válido', () => {
    //Arrange
    const value = 'adsadsadsadsa';

    //Act
    const result = () => new UserEmailValueObject(value);

    //Assert
    expect(result).toThrowError(
      'El email del usuario no tiene un formato válido',
    );
  });

  it('debe validar que el email sea correcto', () => {
    //Arrange
    const value = 'example1@example.com';

    //Act
    const result = new UserEmailValueObject(value);

    //Assert
    expect(result).toBeTruthy();
  });
});
