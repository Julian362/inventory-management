import { UserDomainEntity } from '@domain/entities';
import { IUserLoginService } from '@domain/services';
import { RolesUserEnum } from '@enums';
import { JWTService } from '@infrastructure-jwt/utils/jtw.service';
import { of } from 'rxjs';
import { GetUserUseCase } from '../get.user.use-case';

describe('GetUserUseCase', () => {
  let getUserUseCase: GetUserUseCase;
  let userService: IUserLoginService;
  let jwtService: JWTService;

  beforeEach(() => {
    userService = {
      login: jest.fn(),
    } as unknown as jest.Mocked<IUserLoginService>;
    jwtService = {
      generateToken: jest.fn(),
    } as unknown as jest.Mocked<JWTService>;
    getUserUseCase = new GetUserUseCase(userService, jwtService);
  });

  it('should be defined', () => {
    expect(getUserUseCase).toBeDefined();
  });

  it('should get user', () => {
    // Arrange
    const user: UserDomainEntity = {
      email: 'email@email.com',
      branchId: '66cd6356-4a4f-4890-b2cd-25097bed2962',
      fullName: 'test',
      password: 'Ensayo17',
      role: RolesUserEnum.Admin,
    };
    const expectedUser: UserDomainEntity = user;
    jest.spyOn(userService, 'login').mockReturnValueOnce(of(expectedUser));
    jest
      .spyOn(jwtService, 'generateToken')
      .mockReturnValueOnce(of(user as any));

    // Act
    getUserUseCase.execute(user.email, user.password).subscribe((user) => {
      // Assert
      expect(user).toEqual(expectedUser);
    });
  });
});
