import { StringMinLength } from './string-min-length.validation';

describe('StringMinLength', () => {
  test('retorna false si el valor es igual al mínimo permitido', () => {
    //Arrange
    const value = '1234567890';
    const min = 10;
    const expected = false;

    //Act
    const result = StringMinLength(value, min);

    //Assert
    expect(result).toBe(expected);
  });

  test('retorna false si el valor es mayor al mínimo permitido', () => {
    //Arrange
    const value = '12345678901';
    const min = 10;
    const expected = false;

    //Act
    const result = StringMinLength(value, min);

    //Assert
    expect(result).toBe(expected);
  });

  test('retorna true si el valor es menor al mínimo permitido', () => {
    //Arrange
    const value = '123456789';
    const min = 10;
    const expected = true;

    //Act
    const result = StringMinLength(value, min);

    //Assert
    expect(result).toBe(expected);
  });
});
