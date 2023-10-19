import { TypeNamesEnum } from '@enums';
import { SaleEntity } from '../sale.entity';

describe('SaleEntity', () => {
  let saleEntity: SaleEntity;

  beforeEach(() => {
    saleEntity = new SaleEntity({
      branchId: '7b20e338-e427-4f1e-b02a-2a1581654566',
      date: new Date(),
      number: 1,
      products: [
        {
          name: 'name',
          price: 1,
          quantity: 1,
        },
      ],
      total: 1,
      type: TypeNamesEnum.RegisteredCustomerSale,
    });
  });

  it('should be defined', () => {
    expect(saleEntity).toBeDefined();
  });
});
