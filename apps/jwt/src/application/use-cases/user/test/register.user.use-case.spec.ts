import { IUserCommand } from '@domain/command';
import { UserDomainEntity } from '@domain/entities';
import { IUserDomainService } from '@domain/services';
import { RolesUserEnum } from '@enums';
import { of } from 'rxjs';
import { RegisterUserUseCase } from '../register.user.use-case';

describe('RegisterUserUseCase', () => {
  let registerUserUseCase: RegisterUserUseCase;
  let userService: IUserDomainService;

  beforeEach(() => {
    userService = {
      createUser: jest.fn(),
    } as unknown as jest.Mocked<IUserDomainService>;
    registerUserUseCase = new RegisterUserUseCase(userService);
  });

  it('should be defined', () => {
    expect(registerUserUseCase).toBeDefined();
  });

  it('should register user', () => {
    // Arrange
    const user: IUserCommand = {
      id: '66cd6356-4a4f-4890-b2cd-25097bed2962',
      email: 'email@email.com',
      branchId: '66cd6356-4a4f-4890-b2cd-25097bed2962',
      fullName: {
        firstName: 'test',
        lastName: 'test',
      },
      password: 'Ensayo17',
      role: RolesUserEnum.Admin,
    };
    const expectedUser: UserDomainEntity = {
      id: user.id,
      email: user.email,
      branchId: user.branchId,
      fullName: 'test test',
      password: 'Ensayo17',
      role: RolesUserEnum.Admin,
    };
    jest.spyOn(userService, 'createUser').mockReturnValueOnce(of(expectedUser));

    // Act
    registerUserUseCase.execute(user).subscribe((user) => {
      // Assert
      expect(user).toEqual(expectedUser);
    });
  });
});
