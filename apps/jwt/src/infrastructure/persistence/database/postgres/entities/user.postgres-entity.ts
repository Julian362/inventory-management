import { BeforeInsert, Column, Entity } from 'typeorm';

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

  @Column('varchar', { length: 30, name: 'name' })
  name: string;

  @Column('varchar', { length: 50, name: 'email', unique: true })
  email: string;

  @Column('varchar', { length: 20, name: 'password' })
  password: string;

  @Column('varchar', { length: 30, name: 'role' })
  role: string;

  @Column('uuid', { name: 'branchId', nullable: true })
  branchId: string;

  @BeforeInsert()
  checkFieldsBeforeInsert() {
    this.email = this.email.toLowerCase().trim();
  }
}