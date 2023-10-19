import { BranchDomainEntity } from '@domain/entities';
import { IBranchDomainService } from '@domain/services';
import { of } from 'rxjs';
import { GetBranchUseCase } from '../get.branch.use-case';

describe('GetBranchUseCase', () => {
  let getBranchUseCase: GetBranchUseCase;
  let branchService: IBranchDomainService;

  beforeEach(() => {
    branchService = {
      getBranchById: jest.fn(),
    } as unknown as jest.Mocked<IBranchDomainService>;

    getBranchUseCase = new GetBranchUseCase(branchService);
  });

  it('should be defined', () => {
    expect(getBranchUseCase).toBeDefined();
  });

  it('should get branch by id', () => {
    // Arrange
    const branch: BranchDomainEntity = {
      location: 'test',
      name: 'test',
      id: 'e2a19b12-b063-4816-bb44-eec4fcf1c8ce',
      products: [
        {
          branchId: '66cd6356-4a4f-4890-b2cd-25097bed2962',
          category: 'test',
          description: 'test',
          name: 'test',
          price: 1,
          quantity: 1,
        },
      ],
      users: [],
    };
    const expectedBranch: BranchDomainEntity = branch;
    jest
      .spyOn(branchService, 'getBranchById')
      .mockReturnValueOnce(of(expectedBranch));

    // Act
    let actualBranch: BranchDomainEntity = {} as BranchDomainEntity;
    getBranchUseCase.execute(branch.id).subscribe((branch) => {
      // Assert
      actualBranch = branch;
      expect(actualBranch).toEqual(expectedBranch);
    });
  });
});
