import { Column, Entity, OneToMany } from 'typeorm';
import { ProductPostgresEntity } from './product.postgres-entity';
import { UserPostgresEntity } from './user.postgres-entity';

@Entity('branch', {
  schema: 'public',
})
export class BranchPostgresEntity {
  @Column('uuid', {
    primary: true,
    name: 'branchId',
  })
  id: string;

  @Column('varchar', { length: 30, name: 'name', unique: true })
  name: string;

  @Column('varchar', { length: 30, name: 'city' })
  location: string;

  @OneToMany(() => ProductPostgresEntity, (product) => product.branch)
  products: ProductPostgresEntity[];

  @OneToMany(() => UserPostgresEntity, (user) => user.branch)
  users: UserPostgresEntity[];
}
