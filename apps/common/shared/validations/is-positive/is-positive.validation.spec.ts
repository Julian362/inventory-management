import { IsPositiveNumber } from './is-positive.validation';

describe('IsPositiveNumber', () => {
  test('retorna false si el valor es 0', () => {
    //Arrange
    const value = 0;
    const expected = false;

    //Act
    const result = IsPositiveNumber(value);

    //Assert
    expect(result).toBe(expected);
  });

  test('retorna false si el valor es menor a 0', () => {
    //Arrange
    const value = -1;
    const expected = false;

    //Act
    const result = IsPositiveNumber(value);

    //Assert
    expect(result).toBe(expected);
  });

  test('retorna true si el valor es mayor a 0', () => {
    //Arrange
    const value = 1;
    const expected = true;

    //Act
    const result = IsPositiveNumber(value);

    //Assert
    expect(result).toBe(expected);
  });
});
