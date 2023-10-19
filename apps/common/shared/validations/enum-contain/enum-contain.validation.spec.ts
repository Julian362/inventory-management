import { EnumContains } from './enum-contain.validation';

describe('EnumContain', () => {
  test('retorna false si el valor no esta en el enum', () => {
    //Arrange
    const data = 'valor';
    const enumObject = { valor1: 'valor1', valor2: 'valor2' };
    const expected = false;

    //Act
    const result = EnumContains(data, enumObject);

    //Assert
    expect(result).toBe(expected);
  });

  test('retorna true si el valor esta en el enum', () => {
    //Arrange
    const data = 'valor1';
    const enumObject = { valor1: 'valor1', valor2: 'valor2' };
    const expected = true;

    //Act
    const result = EnumContains(data, enumObject);

    //Assert
    expect(result).toBe(expected);
  });
});
