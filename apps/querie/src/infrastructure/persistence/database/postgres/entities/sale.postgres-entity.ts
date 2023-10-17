import { ProductsType } from '@types';
import { Column, Entity, ManyToOne } from 'typeorm';
import { BranchPostgresEntity } from './branch.postgres-entity';

@Entity('sale', {
  schema: 'public',
})
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

  @Column('varchar', { name: 'type' })
  type: string;

  @ManyToOne(() => BranchPostgresEntity, (branch) => branch.sales, {
    cascade: ['insert'],
  })
  branch: BranchPostgresEntity;
}
