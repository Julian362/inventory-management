import { BranchIdValueObject } from '@domain/value-objects';
import {
  SaleDateValueObject,
  SaleNumberValueObject,
  SaleProductsValueObject,
  SaleTotalValueObject,
  SaleTypeValueObject,
} from '@domain/value-objects/sales';
import { ApiProperty } from '@nestjs/swagger';
import { SaleEnum } from '@shared/enums/sale.enum';
import { ProductsType } from '@types';

export class SaleDomainEntity {
  @ApiProperty({
    description: 'id de la venta',
    example: 'fdca7a8e-9585-4890-9d57-84a88820ae52',
  })
  id?: string;
  @ApiProperty({
    description: 'Numero de la venta',
    example: 1,
  })
  number: number;
  @ApiProperty({
    description: 'Id de la sucursal',
    example: 'fdca7a8e-9585-4890-9d57-84a88820ae52',
  })
  branchId: string;
  @ApiProperty({
    description: 'Productos de la venta',
    example: [
      {
        name: 'Producto 1',
        price: 100,
        quantity: 1,
        total: 100,
      },
    ],
  })
  products: ProductsType[];
  @ApiProperty({
    description: 'Total de la venta',
    example: 100,
  })
  total: number;
  @ApiProperty({
    description: 'Fecha de la venta',
    example: '2021-05-20T00:00:00.000Z',
  })
  date: Date;
  @ApiProperty({
    description: 'Tipo de la venta',
    example: SaleEnum.CustomerSale,
  })
  type: string;

  constructor(data: SaleDomainEntity) {
    this.number = new SaleNumberValueObject(data.number).valueOf();
    this.branchId = new BranchIdValueObject(data.branchId).valueOf();
    data.products.map(
      (product: ProductsType) => new SaleProductsValueObject(product),
    );
    this.products = data.products;
    this.total = new SaleTotalValueObject(data.total).valueOf();
    this.date = new SaleDateValueObject(data.date).valueOf();
    this.type = new SaleTypeValueObject(data.type).valueOf();
  }
}
