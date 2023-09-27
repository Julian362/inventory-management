import { IsUrl } from './is-url.validation';

describe('IsUrl', () => {
  test('retorna false si no es una url', () => {
    //Arrange
    const value = 'Hola mundo';
    const expected = false;

    //Act
    const result = IsUrl(value);

    //Assert
    expect(result).toBe(expected);
  });

  test('retorna true si es una url de una imagen en internet', () => {
    //Arrange
    const value = 'https://www.google.com/image.png';
    const expected = true;

    //Act
    const result = IsUrl(value);

    //Assert
    expect(result).toBe(expected);
  });

  test('retorna true si es una url de una imagen local', () => {
    //Arrange
    const value = './image.png';
    const expected = true;

    //Act
    const result = IsUrl(value);

    //Assert
    expect(result).toBe(expected);
  });
});
