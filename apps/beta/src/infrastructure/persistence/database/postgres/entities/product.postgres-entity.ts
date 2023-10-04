import { Column, Entity, ManyToOne } from 'typeorm';
import { BranchPostgresEntity } from './branch.postgres-entity';

@Entity('product', {
  schema: 'public',
})
export class ProductPostgresEntity {
  @Column('uuid', {
    primary: true,
    name: 'productId',
    default: () => 'uuid_generate_v4()',
  })
  id: string;

  @Column('varchar', { length: 30, name: 'name' })
  name: string;

  @Column('varchar', { length: 50, name: 'category' })
  category: string;

  @Column('decimal', { name: 'price' })
  price: number;

  @Column('varchar', { length: 300, name: 'description' })
  description: string;

  @Column('int', { name: 'quantity' })
  quantity: number;

  @ManyToOne(() => BranchPostgresEntity, (branch) => branch.product, {
    cascade: ['insert'],
  })
  branch: BranchPostgresEntity;

  @Column('uuid', { name: 'branchId' })
  branchId: string;
}
