import { UserEntity } from '../user.entity';

describe('UserEntity', () => {
  let userEntity: UserEntity;

  beforeEach(() => {
    userEntity = new UserEntity();
  });

  it('should be defined', () => {
    expect(userEntity).toBeDefined();
  });
});
