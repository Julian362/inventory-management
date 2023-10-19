import { ProductEntity } from '../product.entity';

describe('ProductEntity', () => {
  let productEntity: ProductEntity;

  beforeEach(() => {
    productEntity = new ProductEntity();
  });

  it('should be defined', () => {
    expect(productEntity).toBeDefined();
  });
});
