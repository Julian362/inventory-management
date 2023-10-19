import { RolesUserEnum } from '@enums';
import { UserEntity } from '../user.entity';

describe('UserEntity', () => {
  let userEntity: UserEntity;

  beforeEach(() => {
    userEntity = new UserEntity({
      branchId: '7b20e338-e427-4f1e-b02a-2a1581654566',
      email: 'email@email.com',
      fullName: 'full Name',
      password: 'Ensayo17',
      role: RolesUserEnum.Admin,
    });
  });

  it('should be defined', () => {
    expect(userEntity).toBeDefined();
  });
});
