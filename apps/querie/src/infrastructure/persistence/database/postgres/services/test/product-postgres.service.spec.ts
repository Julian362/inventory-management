import { Test, TestingModule } from '@nestjs/testing';
import { Observable, of } from 'rxjs';
import { ProductPostgresEntity } from '../../entities';
import { ProductRepository } from '../../repositories';
import { ProductPostgresService } from '../product-postgres.service';

describe('ProductPostgresService', () => {
  let productPostgresService: ProductPostgresService;
  let productRepository: ProductRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductPostgresService,
        {
          provide: ProductRepository,
          useValue: {
            create: jest.fn(),
            findById: jest.fn(),
            findAll: jest.fn(),
            update: jest.fn(),
            getByName: jest.fn(),
          },
        },
      ],
    }).compile();
    productPostgresService = module.get<ProductPostgresService>(
      ProductPostgresService,
    );
    productRepository = module.get<ProductRepository>(ProductRepository);
  });

  it('debería poder crear un producto', (done) => {
    // Arrange
    const productToCreate = new ProductPostgresEntity();
    jest
      .spyOn(productRepository, 'create')
      .mockReturnValue(of(productToCreate));

    // Act
    const result: Observable<ProductPostgresEntity> =
      productPostgresService.createProduct(productToCreate);

    // Assert
    result.subscribe((createdProduct) => {
      expect(createdProduct).toEqual(productToCreate);
      expect(productRepository.create).toHaveBeenCalledWith(productToCreate);
      done();
    });
  });

  it('debería poder obtener un producto por ID', (done) => {
    // Arrange
    const productId = '123';
    const productToReturn = new ProductPostgresEntity();
    jest
      .spyOn(productRepository, 'findById')
      .mockReturnValue(of(productToReturn));

    // Act
    const result: Observable<ProductPostgresEntity> =
      productPostgresService.getProductById(productId);

    // Assert
    result.subscribe((foundProduct) => {
      expect(foundProduct).toEqual(productToReturn);
      expect(productRepository.findById).toHaveBeenCalledWith(productId);
      done();
    });
  });

  it('debería poder obtener todos los productos', (done) => {
    // Arrange
    const userId = 'userId';
    const productsToReturn = [
      new ProductPostgresEntity(),
      new ProductPostgresEntity(),
    ];
    jest
      .spyOn(productRepository, 'findAll')
      .mockReturnValue(of(productsToReturn));

    // Act
    const result: Observable<ProductPostgresEntity[]> =
      productPostgresService.getAllProducts(userId);

    // Assert
    result.subscribe((foundProducts) => {
      expect(foundProducts).toEqual(productsToReturn);
      expect(productRepository.findAll).toHaveBeenCalledWith(userId);
      done();
    });
  });

  it('debería poder modificar la cantidad de un producto', (done) => {
    // Arrange
    const productId = '123';
    const quantity = 5;
    const updatedProduct = new ProductPostgresEntity();
    jest.spyOn(productRepository, 'update').mockReturnValue(of(updatedProduct));

    // Act
    const result: Observable<ProductPostgresEntity> =
      productPostgresService.modifyQuantity(productId, quantity);

    // Assert
    result.subscribe((modifiedProduct) => {
      expect(modifiedProduct).toEqual(updatedProduct);
      expect(productRepository.update).toHaveBeenCalledWith(
        productId,
        quantity,
      );
      done();
    });
  });

  it('debería poder obtener un producto por nombre', (done) => {
    // Arrange
    const productName = 'Product Name';
    const productToReturn = new ProductPostgresEntity();
    jest
      .spyOn(productRepository, 'getByName')
      .mockReturnValue(of(productToReturn));

    // Act
    const result: Observable<ProductPostgresEntity> =
      productPostgresService.getByName(productName);

    // Assert
    result.subscribe((foundProduct) => {
      expect(foundProduct).toEqual(productToReturn);
      expect(productRepository.getByName).toHaveBeenCalledWith(productName);
      done();
    });
  });
});
