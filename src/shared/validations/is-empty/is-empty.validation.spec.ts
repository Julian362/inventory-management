import { IsEmpty } from './is-empty.validation';

describe('Validación si es vació', () => {
  test('debería devolver falso si el valor es un string', () => {
    // Arrange
    const emptyString = 'hola';
    const expected = false;

    // Act
    const result = IsEmpty(emptyString);

    // Assert
    expect(result).toBe(expected);
  });

  test('debería devolver true si el valor no es un string vacío', () => {
    // Arrange
    const emptyString = ' ';
    const expected = true;

    // Act
    const result = IsEmpty(emptyString);

    // Assert
    expect(result).toBe(expected);
  });
  test('debería devolver verdadero si el valor es un objeto vacío', () => {
    // Arrange
    const emptyObject = {};
    const expected = true;

    // Act
    const result = IsEmpty(emptyObject);

    // Assert
    expect(result).toBe(expected);
  });
  test('debe devolver false si el valor es un número diferente de cero', () => {
    // Arrange
    const number = 10;
    const expected = false;

    // Act
    const result = IsEmpty(number);

    // Assert
    expect(result).toBe(expected);
  });

  test('debe devolver false si el valor es un booleano verdadero o falso', () => {
    // Arrange
    const boolTrue = true;
    const boolFalse = false;
    const expected = false;

    // Act
    const resultTrue = IsEmpty(boolTrue);
    const resultFalse = IsEmpty(boolFalse);

    // Assert
    expect(resultTrue).toBe(expected);
    expect(resultFalse).toBe(expected);
  });
  test('debe devolver true si el valor es un nulo', () => {
    // Arrange
    const nullValue = null;
    const expected = true;

    // Act
    const result = IsEmpty(nullValue);

    // Assert
    expect(result).toBe(expected);
  });
  test('debe devolver true si el objeto es vacio', () => {
    // Arrange
    const emptyObject = {};
    const expected = true;

    // Act
    const result = IsEmpty(emptyObject);

    // Assert
    expect(result).toBe(expected);
  });
  test('debe devolver false cuando el objeto no está vacío', () => {
    // Arrange
    const nonEmptyObj = { prop: 'value' };
    const expected = false;

    // Act
    const result = IsEmpty(nonEmptyObj);

    // Assert
    expect(result).toBe(expected);
  });
});
