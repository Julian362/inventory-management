import { ProductDomainEntity } from '@domain/entities';
import { IProductDomainService } from '@domain/services';
import { of } from 'rxjs';
import { GetAllProductUseCase } from '../get-all.product.use-case';

describe('GetAllProductUseCase', () => {
  let getAllProductUseCase: GetAllProductUseCase;
  let productService: IProductDomainService;

  beforeEach(() => {
    productService = {
      getAllProducts: jest.fn(),
    } as unknown as jest.Mocked<IProductDomainService>;
    getAllProductUseCase = new GetAllProductUseCase(productService);
  });

  it('should be defined', () => {
    expect(getAllProductUseCase).toBeDefined();
  });

  it('should get all products', () => {
    // Arrange
    const product: ProductDomainEntity = {
      branchId: '66cd6356-4a4f-4890-b2cd-25097bed2962',
      category: 'test',
      description: 'test',
      name: 'test',
      price: 1,
      quantity: 1,
    };
    const expectedProduct: ProductDomainEntity[] = [product];
    jest
      .spyOn(productService, 'getAllProducts')
      .mockReturnValueOnce(of(expectedProduct));

    // Act
    let actualProduct: ProductDomainEntity[] = [];
    getAllProductUseCase.execute(product.branchId).subscribe((product) => {
      // Assert
      actualProduct = product;
      expect(actualProduct).toEqual(expectedProduct);
    });
  });
});
