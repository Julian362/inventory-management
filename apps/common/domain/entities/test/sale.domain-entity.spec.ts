import { ProductCategory, TypeNamesEnum } from '@enums';
import { SaleDomainEntity } from '../sale.domain-entity';

describe('Sale', () => {
  let sale: SaleDomainEntity;

  beforeEach(() => {
    sale = new SaleDomainEntity({
      total: 10,
      branchId: '39943c1a-4e40-4527-8037-5ea5767e3485',
      number: 10,
      type: TypeNamesEnum.ChangedProductQuantity,
      date: new Date(),
      products: [
        {
          name: 'product',
          price: 10,
          quantity: 10,
        },
      ],
    });
  });

  it('se crea una instancia', () => {
    expect(sale).toBeDefined();
  });

  it('se crea una instancia correctamente con valores validos', () => {
    // Arrange
    const date = new Date();
    const branchId = '02181c8d-491c-4fb6-ab96-0fb4458a4674';
    const number = 10;
    const total = 10;
    const type = TypeNamesEnum.ChangedProductQuantity;
    const products = [
      {
        name: 'product',
        category: ProductCategory.ConstructionHardware,
        price: 10,
        description: 'description',
        quantity: 10,
        branchId: '60cac8f5-9316-4122-a87a-530bd1547b2d',
      },
    ];

    // Act
    const sale = new SaleDomainEntity({
      date,
      products,
      branchId,
      number,
      total,
      type,
    });

    // Assert
    expect(sale.date).toBe(date);
    expect(sale.products).toBe(products);
    expect(sale.branchId).toBe(branchId);
    expect(sale.number).toBe(number);
    expect(sale.total).toBe(total);
    expect(sale.type).toBe(type);
  });
});
