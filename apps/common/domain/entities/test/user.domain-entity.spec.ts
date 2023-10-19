import { UserDomainEntity } from '../user.domain-entity';

describe('User', () => {
  let user: UserDomainEntity;

  beforeEach(() => {
    user = new UserDomainEntity({
      fullName: 'name lastname',
      password: 'Esanyo19',
      email: 'admin@admin.com',
      role: 'admin',
      branchId: '60cac8f5-9316-4122-a87a-530bd1547b2d',
    });
  });

  it('se crea una instancia', () => {
    expect(user).toBeDefined();
  });

  it('se crea una instancia correctamente con valores validos', () => {
    // Arrange
    const fullName = 'name lastname';
    const password = 'Ensayo19';
    const email = 'admin@admin.com';
    const role = 'admin';
    const branchId = '60cac8f5-9316-4122-a87a-530bd1547b2d';

    // Act
    const user = new UserDomainEntity({
      fullName,
      password,
      email,
      role,
      branchId,
    });

    // Assert
    expect(user.fullName).toBe(fullName);
    expect(user.password).toBe(password);
    expect(user.email).toBe(email);
    expect(user.role).toBe(role);
  });
});
