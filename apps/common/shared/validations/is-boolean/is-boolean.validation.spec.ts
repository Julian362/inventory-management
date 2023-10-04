import { IsBoolean } from './is-boolean.validation';

describe('IsBoolean', () => {
  test('retorna false si es un numero', () => {
    //Arrange
    const value = 0;
    const expected = false;

    //Act
    const result = IsBoolean(value);

    //Assert
    expect(result).toBe(expected);
  });

  test('retorna false si es un string', () => {
    //Arrange
    const value = 'true';
    const expected = false;

    //Act
    const result = IsBoolean(value);

    //Assert
    expect(result).toBe(expected);
  });

  test('retorna true si es un booleano', () => {
    //Arrange
    const value = false;
    const expected = true;

    //Act
    const result = IsBoolean(value);

    //Assert
    expect(result).toBe(expected);
  });
});
