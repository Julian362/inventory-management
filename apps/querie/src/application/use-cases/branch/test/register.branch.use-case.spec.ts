import { IBranchCommand } from '@domain/command';
import { BranchDomainEntity } from '@domain/entities';
import { IBranchDomainService } from '@domain/services';
import { of } from 'rxjs';
import { RegisterBranchUseCase } from '../register.branch.use-case';

describe('RegisterBranchUseCase', () => {
  let registerBranchUseCase: RegisterBranchUseCase;
  let branchService: IBranchDomainService;

  beforeEach(() => {
    branchService = {
      createBranch: jest.fn(),
    } as unknown as jest.Mocked<IBranchDomainService>;

    registerBranchUseCase = new RegisterBranchUseCase(branchService);
  });

  it('should be defined', () => {
    expect(registerBranchUseCase).toBeDefined();
  });

  it('should create a branch', () => {
    // Arrange
    const branch: IBranchCommand = {
      location: {
        city: 'test',
        country: 'test',
      },
      name: 'test',
      id: 'e2a19b12-b063-4816-bb44-eec4fcf1c8ce',
    };
    const expectedBranch: BranchDomainEntity = {
      location: 'test, test',
      name: 'test',
      id: 'e2a19b12-b063-4816-bb44-eec4fcf1c8ce',
      products: [],
      users: [],
    };
    jest
      .spyOn(branchService, 'createBranch')
      .mockReturnValueOnce(of(expectedBranch));

    // Act
    let actualBranch: BranchDomainEntity = {} as BranchDomainEntity;
    registerBranchUseCase.execute(branch).subscribe((branch) => {
      // Assert
      actualBranch = branch;
      expect(actualBranch).toEqual(expectedBranch);
    });
  });
});
