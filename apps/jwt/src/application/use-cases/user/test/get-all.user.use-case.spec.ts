import { UserDomainEntity } from '@domain/entities';
import { IUserDomainService } from '@domain/services';
import { RolesUserEnum } from '@enums';
import { of } from 'rxjs';
import { GetAllUserUseCase } from '../get-all.user.use-case';

describe('GetAllUserUseCase', () => {
  let getAllUserUseCase: GetAllUserUseCase;
  let userService: IUserDomainService;

  beforeEach(() => {
    userService = {
      getAllUsers: jest.fn(),
    } as unknown as jest.Mocked<IUserDomainService>;
    getAllUserUseCase = new GetAllUserUseCase(userService);
  });

  it('should be defined', () => {
    expect(getAllUserUseCase).toBeDefined();
  });

  it('should get all user', () => {
    // Arrange
    const user: UserDomainEntity = {
      email: 'email@email.com',
      branchId: '66cd6356-4a4f-4890-b2cd-25097bed2962',
      fullName: 'test',
      password: 'Ensayo17',
      role: RolesUserEnum.Admin,
    };
    const expectedUser: UserDomainEntity[] = [user];
    jest
      .spyOn(userService, 'getAllUsers')
      .mockReturnValueOnce(of(expectedUser));

    // Act
    getAllUserUseCase.execute().subscribe((user) => {
      // Assert
      expect(user).toEqual(expectedUser);
    });
  });
});
