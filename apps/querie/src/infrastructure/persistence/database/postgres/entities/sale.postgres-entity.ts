import { ProductsType } from '@types';
import { Column } from 'typeorm';

export class SalePostgresEntity {
  @Column('uuid', {
    primary: true,
    name: 'saleId',
  })
  id: string;

  @Column('int', { name: 'number', unique: true })
  number: number;

  @Column('uuid', { name: 'branchId' })
  branchId: string;

  @Column('varchar', {
    name: 'products',
    array: true,
    nullable: false,
    default: '{}',
  })
  products: ProductsType[];

  @Column('float', { name: 'total' })
  total: number;

  @Column('timestamp', { name: 'date' })
  date: Date;
}
