import { ProductCategory } from '@enums';
import { ProductDomainEntity } from '../product.domain-entity';

describe('Product', () => {
  let product: ProductDomainEntity;

  beforeEach(() => {
    product = new ProductDomainEntity({
      name: 'product',
      category: ProductCategory.ConstructionHardware,
      price: 10,
      description: 'description',
      quantity: 10,
      branchId: '60cac8f5-9316-4122-a87a-530bd1547b2d',
    });
  });

  it('se crea una instancia', () => {
    expect(product).toBeDefined();
  });

  it('se crea una instancia correctamente con valores validos', () => {
    // Arrange
    const name = 'product';
    const category = ProductCategory.ConstructionHardware;
    const price = 10;
    const description = 'description';
    const quantity = 10;
    const branchId = '501af163-70e8-4ddd-a550-bebc26301323';

    // Act
    const product = new ProductDomainEntity({
      name,
      category,
      price,
      description,
      quantity,
      branchId,
    });

    // Assert
    expect(product.name).toBe(name);
    expect(product.category).toBe(category);
    expect(product.price).toBe(price);
    expect(product.description).toBe(description);
    expect(product.quantity).toBe(quantity);
    expect(product.branchId).toBe(branchId);
  });
});
