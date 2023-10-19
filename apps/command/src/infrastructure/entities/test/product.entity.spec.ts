import { ProductCategory } from '@enums';
import { ProductEntity } from '../product.entity';

describe('ProductEntity', () => {
  let productEntity: ProductEntity;

  beforeEach(() => {
    productEntity = new ProductEntity({
      name: 'name',
      description: 'description',
      price: 1,
      branchId: '7b20e338-e427-4f1e-b02a-2a1581654566',
      quantity: 1,
      category: ProductCategory.ConstructionHardware,
    });
  });

  it('should be defined', () => {
    expect(productEntity).toBeDefined();
  });
});
