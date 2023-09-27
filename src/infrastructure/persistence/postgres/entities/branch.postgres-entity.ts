import { BranchDomainEntity } from '@domain/entities/branch.domain-entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { ProductPostgresEntity } from './product.postgres-entity';
import { UserPostgresEntity } from './user.postgres-entity';

@Entity('branch', {
  schema: 'public',
})
export class BranchPostgresEntity extends BranchDomainEntity {
  @Column('uuid', {
    primary: true,
    name: 'branchId',
    default: () => 'uuid_generate_v4()',
  })
  id: string;

  @Column('varchar', { length: 30, name: 'name' })
  name: string;

  @Column('varchar', { length: 30, name: 'city' })
  location: string;

  @OneToMany(() => ProductPostgresEntity, (product) => product.branch)
  product: ProductPostgresEntity[];

  @OneToMany(() => UserPostgresEntity, (user) => user.branch)
  user: UserPostgresEntity[];
}
