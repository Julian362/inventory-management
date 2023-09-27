import { IsEmail } from './is-email.validation';

describe('IsEmail', () => {
  test('retorna false si el valor es un email no válido', () => {
    //Arrange
    const value = 'andres@';
    const expected = false;

    //Act
    const result = IsEmail(value);

    //Assert
    expect(result).toBe(expected);
  });

  test('retorna true si el valor es un email válido', () => {
    //Arrange
    const value = 'julian@sofka.com.co';
    const expected = true;

    //Act
    const result = IsEmail(value);

    //Assert
    expect(result).toBe(expected);
  });
});
