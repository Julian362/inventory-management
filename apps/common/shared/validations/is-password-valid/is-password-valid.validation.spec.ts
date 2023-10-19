import { IsPasswordValid } from './is-password-valid.validation';

describe('IsPasswordValid', () => {
  test('retorna false si el valor es menor a 8 caracteres', () => {
    //Arrange
    const value = 'aA1';
    const expected = false;

    //Act
    const result = IsPasswordValid(value);

    //Assert
    expect(result).toBe(expected);
  });

  test('retorna false si el valor es mayor a 16 caracteres', () => {
    //Arrange
    const value = 'aA1'.repeat(6);
    const expected = false;

    //Act
    const result = IsPasswordValid(value);

    //Assert
    expect(result).toBe(expected);
  });

  test('retorna false si el valor no contiene al menos una letra mayúscula', () => {
    //Arrange
    const value = 'a1'.repeat(8);
    const expected = false;

    //Act
    const result = IsPasswordValid(value);

    //Assert
    expect(result).toBe(expected);
  });

  test('retorna false si el valor no contiene al menos una letra minúscula', () => {
    //Arrange
    const value = 'A1'.repeat(8);
    const expected = false;

    //Act
    const result = IsPasswordValid(value);

    //Assert
    expect(result).toBe(expected);
  });

  test('retorna false si el valor no contiene al menos un número', () => {
    //Arrange
    const value = 'aA'.repeat(8);
    const expected = false;

    //Act
    const result = IsPasswordValid(value);

    //Assert
    expect(result).toBe(expected);
  });

  test('retorna true si el valor cumple con los requisitos', () => {
    //Arrange
    const value = 'aA1'.repeat(4);
    const expected = true;

    //Act
    const result = IsPasswordValid(value);

    //Assert
    expect(result).toBe(expected);
  });
});
