import { Test, TestingModule } from '@nestjs/testing';
import { Observable, of } from 'rxjs';
import { BranchPostgresEntity } from '../../entities';
import { BranchRepository } from '../../repositories';
import { BranchPostgresService } from '../branch-postgres.service';

describe('BranchPostgresService', () => {
  let branchPostgresService: BranchPostgresService;
  let branchRepository: BranchRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BranchPostgresService,
        {
          provide: BranchRepository,
          useValue: {
            create: jest.fn(),
            findById: jest.fn(),
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();
    branchPostgresService = module.get<BranchPostgresService>(
      BranchPostgresService,
    );
    branchRepository = module.get<BranchRepository>(BranchRepository);
  });

  it('debería poder crear una sucursal', (done) => {
    // Arrange
    const branchToCreate = new BranchPostgresEntity();
    jest.spyOn(branchRepository, 'create').mockReturnValue(of(branchToCreate));

    // Act
    const result: Observable<BranchPostgresEntity> =
      branchPostgresService.createBranch(branchToCreate);

    // Assert
    result.subscribe((createdBranch) => {
      expect(createdBranch).toEqual(branchToCreate);
      expect(branchRepository.create).toHaveBeenCalledWith(branchToCreate);
      done();
    });
  });

  it('debería poder obtener una sucursal por ID', (done) => {
    // Arrange
    const branchId = '123';
    const branchToReturn = new BranchPostgresEntity();
    jest
      .spyOn(branchRepository, 'findById')
      .mockReturnValue(of(branchToReturn));

    // Act
    const result: Observable<BranchPostgresEntity> =
      branchPostgresService.getBranchById(branchId);

    // Assert
    result.subscribe((foundBranch) => {
      expect(foundBranch).toEqual(branchToReturn);
      expect(branchRepository.findById).toHaveBeenCalledWith(branchId);
      done();
    });
  });

  it('debería poder obtener todas las sucursales', (done) => {
    // Arrange
    const branchesToReturn = [
      new BranchPostgresEntity(),
      new BranchPostgresEntity(),
    ];
    jest
      .spyOn(branchRepository, 'findAll')
      .mockReturnValue(of(branchesToReturn));

    // Act
    const result: Observable<BranchPostgresEntity[]> =
      branchPostgresService.getAllBranches();

    // Assert
    result.subscribe((foundBranches) => {
      expect(foundBranches).toEqual(branchesToReturn);
      expect(branchRepository.findAll).toHaveBeenCalled();
      done();
    });
  });
});
