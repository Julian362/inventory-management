import { ProductDescriptionValueObject } from '../description.value-object';

describe('Descripción del producto', () => {
  let description: ProductDescriptionValueObject;

  beforeEach(() => {
    // Arrange and Act

    description = new ProductDescriptionValueObject('Descripción del producto');
  });

  it(' puede ser creado', () => {
    // Arrange
    expect(description).toBeDefined();
  });

  it(' no puede ser creado con una descripción vacía', () => {
    // Arrange
    const value = '';

    // Act
    const isValid = () => new ProductDescriptionValueObject(value);

    // Assert
    expect(isValid).toThrowError(
      'El campo descripción del producto no puede estar vacío',
    );
  });

  it(' no puede ser creado con una descripción mayor a 300 caracteres', () => {
    // Arrange
    const value = 'a'.repeat(301);

    // Act
    const isValid = () => new ProductDescriptionValueObject(value);

    // Assert
    expect(isValid).toThrowError(
      'El campo descripción del producto no puede superar 300 de caracteres',
    );
  });

  it('no puede ser creada con una descripción menor a 3 caracteres', () => {
    // Arrange
    const value = 'a'.repeat(2);

    // Act
    const isValid = () => new ProductDescriptionValueObject(value);

    // Assert
    expect(isValid).toThrowError(
      'El campo descripción del producto debe tener al menos 3 caracteres',
    );
  });

  it('si le paso una descripción válida, no lanza una excepción', () => {
    // Arrange
    const value = 'Descripción del producto';

    // Act
    const isValid = new ProductDescriptionValueObject(value);

    // Assert
    expect(isValid).toBe(isValid);
  });
});
