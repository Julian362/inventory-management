import { UserDomainEntity } from '@domain/entities';
import { Test, TestingModule } from '@nestjs/testing';
import { Observable, of } from 'rxjs';
import { UserPostgresEntity } from '../../entities';
import { UserRepository } from '../../repositories';
import { UserPostgresService } from '../user-postgres.service';

describe('UserPostgresService', () => {
  let userPostgresService: UserPostgresService;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserPostgresService,
        {
          provide: UserRepository,
          useValue: {
            create: jest.fn(),
            findById: jest.fn(),
            findAll: jest.fn(),
            findAllAdmins: jest.fn(),
          },
        },
      ],
    }).compile();
    userPostgresService = module.get<UserPostgresService>(UserPostgresService);
    userRepository = module.get<UserRepository>(UserRepository);
  });

  it('poder crear un usuario', (done) => {
    // Arrange
    const userToCreate = new UserPostgresEntity();
    jest.spyOn(userRepository, 'create').mockReturnValue(of(userToCreate));

    // Act
    const result: Observable<UserPostgresEntity> =
      userPostgresService.createUser(userToCreate);

    // Assert
    result.subscribe((createdUser) => {
      expect(createdUser).toEqual(userToCreate);
      expect(userRepository.create).toHaveBeenCalledWith(userToCreate);
      done();
    });
  });

  it('poder obtener un usuario por id', (done) => {
    // Arrange
    const userId = '123';
    const userToReturn = new UserPostgresEntity();
    jest.spyOn(userRepository, 'findById').mockReturnValue(of(userToReturn));

    // Act
    const result: Observable<UserPostgresEntity> =
      userPostgresService.getUserById(userId);

    // Assert
    result.subscribe((foundUser) => {
      expect(foundUser).toEqual(userToReturn);
      expect(userRepository.findById).toHaveBeenCalledWith(userId);
      done();
    });
  });

  it('poder obtener todos los usuarios', (done) => {
    // Arrange
    const usersToReturn = [new UserPostgresEntity(), new UserPostgresEntity()];
    jest.spyOn(userRepository, 'findAll').mockReturnValue(of(usersToReturn));

    // Act
    const result: Observable<UserDomainEntity[]> =
      userPostgresService.getAllUsers();

    // Assert
    result.subscribe((foundUsers) => {
      expect(foundUsers).toEqual(usersToReturn);
      expect(userRepository.findAll).toHaveBeenCalled();
      done();
    });
  });

  it('poder obtener todos los admins', (done) => {
    // Arrange
    const userId = 'adminId';
    const adminsToReturn = [new UserPostgresEntity(), new UserPostgresEntity()];
    jest
      .spyOn(userRepository, 'findAllAdmins')
      .mockReturnValue(of(adminsToReturn));

    // Act
    const result: Observable<UserDomainEntity[]> =
      userPostgresService.getAllAdmins(userId);

    // Assert
    result.subscribe((foundAdmins) => {
      expect(foundAdmins).toEqual(adminsToReturn);
      expect(userRepository.findAllAdmins).toHaveBeenCalledWith(userId);
      done();
    });
  });
});
