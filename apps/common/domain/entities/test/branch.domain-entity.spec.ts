import { BranchDomainEntity } from '../branch.domain-entity';

describe('Branch', () => {
  let branch: BranchDomainEntity;

  beforeEach(() => {
    branch = new BranchDomainEntity('branch', 'city, country');
  });

  it('se crea una instancia', () => {
    expect(branch).toBeDefined();
  });

  it('se crea una instancia correctamente con valores validos', () => {
    // Arrange
    const name = 'branch';
    const location = 'city, country';

    // Act
    const branch = new BranchDomainEntity(name, location);

    // Assert
    expect(branch.name).toBe(name);
    expect(branch.location).toBe(location);
  });
});
