import { SaleDomainEntity } from '@domain/entities';
import { ISaleDomainService } from '@domain/services';
import { SaleEnum } from '@shared/enums/sale.enum';
import { of } from 'rxjs';
import { GetAllSaleUseCase } from '../get-all.sale.use-case';

describe('GetAllSaleUseCase', () => {
  let getAllSaleUseCase: GetAllSaleUseCase;
  let saleService: ISaleDomainService;

  beforeEach(() => {
    saleService = {
      getAllSale: jest.fn(),
    } as unknown as jest.Mocked<ISaleDomainService>;

    getAllSaleUseCase = new GetAllSaleUseCase(saleService);
  });

  it('should be defined', () => {
    expect(getAllSaleUseCase).toBeDefined();
  });

  it('should get all sale', () => {
    // Arrange
    const sale: SaleDomainEntity = {
      branchId: '66cd6356-4a4f-4890-b2cd-25097bed2962',
      date: new Date(),
      number: 1,
      products: [],
      total: 1,
      type: SaleEnum.CustomerSale,
      id: 'e2a19b12-b063-4816-bb44-eec4fcf1c8ce',
    };
    const expectedSale: SaleDomainEntity[] = [sale];
    jest.spyOn(saleService, 'getAllSale').mockReturnValueOnce(of(expectedSale));

    // Act
    getAllSaleUseCase.execute(sale.id).subscribe((sale) => {
      // Assert
      expect(sale).toEqual(expectedSale);
    });
  });
});
