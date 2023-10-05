import { Column, Entity, ManyToOne } from 'typeorm';
import { BranchPostgresEntity } from './branch.postgres-entity';

@Entity('user', {
  schema: 'public',
})
export class UserPostgresEntity {
  @Column('uuid', {
    primary: true,
    name: 'userId',
    unique: true,
  })
  id: string;

  @Column('varchar', { length: 30, name: 'name', unique: true })
  name: string;

  @Column('varchar', { length: 50, name: 'email', unique: true })
  email: string;

  @Column('varchar', { length: 20, name: 'password' })
  password: string;

  @Column('varchar', { length: 30, name: 'role' })
  role: string;

  @ManyToOne(() => BranchPostgresEntity, (branch) => branch.users, {
    cascade: ['insert'],
  })
  branch: BranchPostgresEntity;

  @Column('uuid', { name: 'branchId' })
  branchId: string;
}
