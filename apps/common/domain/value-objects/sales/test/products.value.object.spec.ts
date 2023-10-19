import { SaleProductsValueObject } from '../products.value.object';

describe('Producto', () => {
  let product: SaleProductsValueObject;

  beforeEach(() => {
    // Arrange and Act
    product = new SaleProductsValueObject({
      quantity: 1,
      price: 1000,
      name: 'Producto',
    });
  });

  it(' puede ser creado', () => {
    // Arrange
    expect(product).toBeDefined();
  });

  it(' no puede ser creado con una cantidad menor a 0', () => {
    // Arrange
    const value = -1;

    // Act
    const isValid = () =>
      new SaleProductsValueObject({
        quantity: value,
        price: 1000,
        name: 'Producto',
      });

    // Assert
    expect(isValid).toThrowError(
      'La cantidad del producto debe ser un número positivo',
    );
  });

  it(' no puede ser creado con un precio menor a 0', () => {
    // Arrange
    const value = -1;

    // Act
    const isValid = () =>
      new SaleProductsValueObject({
        quantity: 1,
        price: value,
        name: 'Producto',
      });

    // Assert
    expect(isValid).toThrowError(
      'El precio del producto debe ser un número positivo',
    );
  });

  it(' no puede ser creado con un nombre vacío', () => {
    // Arrange
    const value = '';

    // Act
    const isValid = () =>
      new SaleProductsValueObject({
        quantity: 1,
        price: 1000,
        name: value,
      });

    // Assert
    expect(isValid).toThrowError(
      'El campo nombre del producto no puede estar vacío',
    );
  });

  it(' si le paso un producto válido, no lanza una excepción', () => {
    // Arrange
    const value = {
      quantity: 1,
      price: 1000,
      name: 'Producto',
    };

    // Act
    const isValid = new SaleProductsValueObject(value);

    // Assert
    expect(isValid).toBe(isValid);
  });
});
