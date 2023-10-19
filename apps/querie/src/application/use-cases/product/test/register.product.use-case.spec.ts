import { IProductCommand } from '@domain/command';
import { ProductDomainEntity } from '@domain/entities';
import { IProductDomainService } from '@domain/services';
import { ProductCategory } from '@enums';
import { of } from 'rxjs';
import { RegisterProductUseCase } from '../register.product.use-case';

describe('RegisterProductUseCase', () => {
  let registerProductUseCase: RegisterProductUseCase;
  let productService: IProductDomainService;

  beforeEach(() => {
    productService = {
      createProduct: jest.fn(),
    } as unknown as jest.Mocked<IProductDomainService>;
    registerProductUseCase = new RegisterProductUseCase(productService);
  });

  it('should be defined', () => {
    expect(registerProductUseCase).toBeDefined();
  });

  it('should create a product', () => {
    // Arrange
    const product: IProductCommand = {
      branchId: 'e2a19b12-b063-4816-bb44-eec4fcf1c8ce',
      category: ProductCategory.ConstructionHardware,
      description: 'test',
      name: 'test',
      price: 1,
      quantity: 1,
      id: 'e2a19b12-b063-4816-bb44-eec4fcf1c8ce',
    };
    const expectedProduct: ProductDomainEntity = {
      branchId: 'e2a19b12-b063-4816-bb44-eec4fcf1c8ce',
      category: ProductCategory.ConstructionHardware,
      description: 'test',
      name: 'test',
      price: 1,
      quantity: 1,
      id: 'e2a19b12-b063-4816-bb44-eec4fcf1c8ce',
    };
    jest
      .spyOn(productService, 'createProduct')
      .mockReturnValueOnce(of(expectedProduct));

    // Act
    let actualProduct: ProductDomainEntity = {} as ProductDomainEntity;
    registerProductUseCase.execute(product).subscribe((product) => {
      // Assert
      actualProduct = product;
      expect(actualProduct).toEqual(expectedProduct);
    });
  });
});
