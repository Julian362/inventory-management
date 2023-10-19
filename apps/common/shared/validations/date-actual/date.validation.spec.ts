import { CurrentDateTimeValidation } from './date.validation';

describe('CurrentDateTimeValidation', () => {
  test('retorna false si la fecha es mayor a la actual', () => {
    //Arrange
    const date = new Date(
      new Date(Date.now()).setDate(new Date(Date.now()).getDate() + 1),
    );
    const expected = false;

    //Act
    const result = CurrentDateTimeValidation(date, new Date(Date.now()));

    //Assert
    expect(result).toBe(expected);
  });

  test('retorna true si la fecha es la actual', () => {
    //Arrange
    const date = new Date(
      new Date(Date.now()).setDate(new Date(Date.now()).getDate()),
    );
    const expected = true;

    //Act
    const result = CurrentDateTimeValidation(date, new Date(Date.now()));

    //Assert
    expect(result).toBe(expected);
  });
});
