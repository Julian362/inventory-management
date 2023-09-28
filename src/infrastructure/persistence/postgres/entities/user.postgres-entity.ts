import { Column, Entity, ManyToOne } from 'typeorm';
import { BranchPostgresEntity } from './branch.postgres-entity';

@Entity('user', {
  schema: 'public',
})
export class UserPostgresEntity {
  @Column('uuid', {
    primary: true,
    name: 'userId',
    default: () => 'uuid_generate_v4()',
  })
  id: string;

  @Column('varchar', { length: 30, name: 'name' })
  name: string;

  @Column('varchar', { length: 50, name: 'email' })
  email: string;

  @Column('varchar', { length: 20, name: 'password' })
  password: string;

  @Column('varchar', { length: 30, name: 'role' })
  role: string;

  @ManyToOne(() => BranchPostgresEntity, (branch) => branch.user, {
    cascade: ['insert'],
  })
  branch: BranchPostgresEntity;

  @Column('uuid', { name: 'branchId' })
  branchId: string;
}
