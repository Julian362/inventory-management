import { UserPasswordValueObject } from '../password.value-object';

describe('Password', () => {
  let password: UserPasswordValueObject;

  beforeEach(() => {
    //Arrange and Act
    password = new UserPasswordValueObject('Ensayo18');
  });

  it('puede ser creado', () => {
    //Assert
    expect(password).toBeTruthy();
  });

  it('debe validar que el password no sea vacío', () => {
    //Arrange
    const value = '';
    //Act
    const result = () => new UserPasswordValueObject(value);

    //Assert
    expect(result).toThrowError(
      'La contraseña del usuario no puede estar vacío',
    );
  });

  it('debe validar que el password no sea mayor a 150 caracteres', () => {
    //Arrange
    const value = 'aA1'.repeat(150);

    //Act
    const result = () => new UserPasswordValueObject(value);

    //Assert
    expect(result).toThrowError();
  });

  it('debe validar que el password tenga un formato válido', () => {
    //Arrange
    const value = 'adsadsadsadsa';

    //Act
    const result = () => new UserPasswordValueObject(value);

    //Assert
    expect(result).toThrowError();
  });
  it('debe validar que el password no sea menor a 8 caracteres', () => {
    //Arrange
    const value = 'aA1'.repeat(2);

    //Act
    const result = () => new UserPasswordValueObject(value);

    //Assert
    expect(result).toThrowError();
  });
  it('debe validar que el password sea correcto', () => {
    //Arrange
    const value = 'Esanyo18';

    //Act
    const result = new UserPasswordValueObject(value);

    //Assert
    expect(result).toBeTruthy();
  });
});
