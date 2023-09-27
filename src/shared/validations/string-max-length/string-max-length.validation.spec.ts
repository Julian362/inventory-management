import { StringMaxLength } from './string-max-length.validation';

describe('StringMaxLength', () => {
  test('retorna false si el valor es igual al máximo permitido', () => {
    //Arrange
    const value = '1234567890';
    const max = 10;
    const expected = false;

    //Act
    const result = StringMaxLength(value, max);

    //Assert
    expect(result).toBe(expected);
  });

  test('retorna false si el valor es menor al máximo permitido', () => {
    //Arrange
    const value = '12345678';
    const max = 10;
    const expected = false;

    //Act
    const result = StringMaxLength(value, max);

    //Assert
    expect(result).toBe(expected);
  });

  test('retorna true si el valor es mayor al máximo permitido', () => {
    //Arrange
    const value = '12345678901';
    const max = 9;
    const expected = true;

    //Act
    const result = StringMaxLength(value, max);

    //Assert
    expect(result).toBe(expected);
  });
});
