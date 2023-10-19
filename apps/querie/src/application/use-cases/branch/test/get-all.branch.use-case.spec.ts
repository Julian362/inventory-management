import { BranchDomainEntity } from '@domain/entities';
import { IBranchDomainService } from '@domain/services';
import { of } from 'rxjs';
import { GetAllBranchUseCase } from '../get-all.branch.use-case';

describe('GetAllBranchUseCase', () => {
  let getAllBranchUseCase: GetAllBranchUseCase;
  let branchService: IBranchDomainService;

  beforeEach(() => {
    branchService = {
      getAllBranches: jest.fn(),
    } as unknown as jest.Mocked<IBranchDomainService>;

    getAllBranchUseCase = new GetAllBranchUseCase(branchService);
  });

  it('should be defined', () => {
    expect(getAllBranchUseCase).toBeDefined();
  });

  it('should get all branches', () => {
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
    const expectedBranch: BranchDomainEntity[] = [branch];
    jest
      .spyOn(branchService, 'getAllBranches')
      .mockReturnValueOnce(of(expectedBranch));

    // Act
    let actualBranch: BranchDomainEntity[] = [];
    getAllBranchUseCase.execute().subscribe((branch) => {
      // Assert
      actualBranch = branch;
      expect(actualBranch).toEqual(expectedBranch);
    });
  });
});
