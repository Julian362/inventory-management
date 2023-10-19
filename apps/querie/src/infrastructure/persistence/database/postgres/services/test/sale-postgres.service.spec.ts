import { SaleDomainEntity } from '@domain/entities';
import { Test, TestingModule } from '@nestjs/testing';
import { Observable, of } from 'rxjs';
import { SalePostgresEntity } from '../../entities';
import { SaleRepository } from '../../repositories';
import { SalePostgresService } from '../sale-postgres.service';

describe('SalePostgresService', () => {
  let salePostgresService: SalePostgresService;
  let saleRepository: SaleRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SalePostgresService,
        {
          provide: SaleRepository,
          useValue: {
            create: jest.fn(),
            findById: jest.fn(),
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();
    salePostgresService = module.get<SalePostgresService>(SalePostgresService);
    saleRepository = module.get<SaleRepository>(SaleRepository);
  });

  it('debería poder crear una venta', (done) => {
    // Arrange
    const saleToCreate = new SalePostgresEntity();
    jest.spyOn(saleRepository, 'create').mockReturnValue(of(saleToCreate));

    // Act
    const result: Observable<SaleDomainEntity> =
      salePostgresService.createSale(saleToCreate);

    // Assert
    result.subscribe((createdSale) => {
      expect(createdSale).toEqual(saleToCreate);
      expect(saleRepository.create).toHaveBeenCalledWith(saleToCreate);
      done();
    });
  });

  it('debería poder obtener una venta por ID', (done) => {
    // Arrange
    const saleId = '123';
    const saleToReturn = new SalePostgresEntity();
    jest.spyOn(saleRepository, 'findById').mockReturnValue(of(saleToReturn));

    // Act
    const result: Observable<SaleDomainEntity> =
      salePostgresService.getSaleById(saleId);

    // Assert
    result.subscribe((foundSale) => {
      expect(foundSale).toEqual(saleToReturn);
      expect(saleRepository.findById).toHaveBeenCalledWith(saleId);
      done();
    });
  });

  it('debería poder obtener todas las ventas', (done) => {
    // Arrange
    const userId = 'userId';
    const salesToReturn = [new SalePostgresEntity(), new SalePostgresEntity()];
    jest.spyOn(saleRepository, 'findAll').mockReturnValue(of(salesToReturn));

    // Act
    const result: Observable<SaleDomainEntity[]> =
      salePostgresService.getAllSale(userId);

    // Assert
    result.subscribe((foundSales) => {
      expect(foundSales).toEqual(salesToReturn);
      expect(saleRepository.findAll).toHaveBeenCalledWith(userId);
      done();
    });
  });
});
