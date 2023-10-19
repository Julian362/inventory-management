import { BranchEntity } from '../branch.entity';

describe('BranchEntity', () => {
  let branchEntity: BranchEntity;

  beforeEach(() => {
    branchEntity = new BranchEntity('name', 'location, location');
  });

  it('should be defined', () => {
    expect(branchEntity).toBeDefined();
  });
});
