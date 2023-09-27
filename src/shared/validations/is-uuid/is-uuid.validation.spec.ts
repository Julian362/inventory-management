import { IsUUID } from './is-uuid.validation';

describe('IsUUID', () => {
  test('retorna true si el valor es un UUID y versión 4', () => {
    //Arrange
    const UUID_v4 = '9bdd9397-4570-4289-b35d-2fc0e901ccee';
    const expected = true;

    //Act
    const result = IsUUID(UUID_v4);

    //Assert
    expect(result).toBe(expected);
  });

  test('retorna false si el valor no es un UUID con versión 4', () => {
    //Arrange
    const UUID_v1 = '2a973294-c14e-11ed-afa1-0242ac120002';
    const expected = false;

    //Act
    const result = IsUUID(UUID_v1);

    //Assert
    expect(result).toBe(expected);
  });
});
