import { ProductDomainEntity } from '@domain/entities';
import { IProductDomainService } from '@domain/services';
import { of } from 'rxjs';
import { UpdateQuantityProductUseCase } from '../update-quantity.product.use-case';

describe('UpdateQuantityProductUseCase', () => {
  let updateQuantityProductUseCase: UpdateQuantityProductUseCase;
  let productService: IProductDomainService;

  beforeEach(() => {
    productService = {
      getProductById: jest.fn(),
      modifyQuantity: jest.fn(),
    } as unknown as jest.Mocked<IProductDomainService>;
    updateQuantityProductUseCase = new UpdateQuantityProductUseCase(
      productService,
    );
  });

  it('should be defined', () => {
    expect(updateQuantityProductUseCase).toBeDefined();
  });

  it('should update product quantity', () => {
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
    jest
      .spyOn(productService, 'modifyQuantity')
      .mockReturnValueOnce(of(expectedProduct));

    // Act
    let actualProduct: ProductDomainEntity = {} as ProductDomainEntity;
    updateQuantityProductUseCase
      .execute(product.id, product.quantity)
      .subscribe((product) => {
        // Assert
        actualProduct = product;
        expect(actualProduct).toEqual(expectedProduct);
      });
  });
});
