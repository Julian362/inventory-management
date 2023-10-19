import { BranchEntity } from '../branch.entity';

describe('BranchEntity', () => {
  let branchEntity: BranchEntity;

  beforeEach(() => {
    branchEntity = new BranchEntity();
  });

  it('should be defined', () => {
    expect(branchEntity).toBeDefined();
  });
});
