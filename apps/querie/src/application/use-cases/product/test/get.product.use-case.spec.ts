import { ProductDomainEntity } from '@domain/entities';
import { IProductDomainService } from '@domain/services';
import { of } from 'rxjs';
import { GetProductUseCase } from '../get.product.use-case';

describe('GetProductUseCase', () => {
  let getProductUseCase: GetProductUseCase;
  let productService: IProductDomainService;

  beforeEach(() => {
    productService = {
      getProductById: jest.fn(),
    } as unknown as jest.Mocked<IProductDomainService>;
    getProductUseCase = new GetProductUseCase(productService);
  });

  it('should be defined', () => {
    expect(getProductUseCase).toBeDefined();
  });

  it('should get product by id', () => {
    // Arrange
    const product: ProductDomainEntity = {
      branchId: '66cd6356-4a4f-4890-b2cd-25097bed2962',
      category: 'test',
      description: 'test',
      name: 'test',
      price: 1,
      quantity: 1,
      id: 'e2a19b12-b063-4816-bb44-eec4fcf1c8ce',
    };
    const expectedProduct: ProductDomainEntity = product;
    jest
      .spyOn(productService, 'getProductById')
      .mockReturnValueOnce(of(expectedProduct));

    // Act
    let actualProduct: ProductDomainEntity = {} as ProductDomainEntity;
    getProductUseCase.execute(product.id).subscribe((product) => {
      // Assert
      actualProduct = product;
      expect(actualProduct).toEqual(expectedProduct);
    });
  });
});
