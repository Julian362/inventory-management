import { UserDomainEntity } from '@domain/entities';
import { IUserDomainService } from '@domain/services';
import { RolesUserEnum } from '@enums';
import { JWTService } from '@infrastructure-jwt/utils/jtw.service';
import { of } from 'rxjs';
import { RefreshTokenUseCase } from '../refresh.use-case';

describe('RefreshUseCase', () => {
  let refreshUseCase: RefreshTokenUseCase;
  let userService: IUserDomainService;
  let jwtService: JWTService;

  beforeEach(() => {
    userService = {
      getUserById: jest.fn(),
    } as unknown as jest.Mocked<IUserDomainService>;

    jwtService = {
      generateToken: jest.fn(),
      verify: jest.fn(),
    } as unknown as jest.Mocked<JWTService>;

    refreshUseCase = new RefreshTokenUseCase(jwtService, userService);
  });

  it('should be defined', () => {
    expect(refreshUseCase).toBeDefined();
  });

  it('should refresh token', () => {
    // Arrange
    const user: UserDomainEntity = {
      email: 'email@email.com',
      branchId: '66cd6356-4a4f-4890-b2cd-25097bed2962',
      fullName: 'test',
      password: 'Ensayo17',
      role: RolesUserEnum.Admin,
    };
    jest.spyOn(userService, 'getUserById').mockReturnValueOnce(of(user));
    jest.spyOn(jwtService, 'generateToken').mockReturnValueOnce(
      of({
        token: 'token',
      } as any),
    );
    jest.spyOn(jwtService, 'verify').mockReturnValueOnce(of(true));

    // Act
    refreshUseCase
      .execute({
        token: 'token',
        id: '9b93fe0f-4dad-4dff-963c-b3cdd4791a15',
      })
      .subscribe((user) => {
        // Assert
        expect(user).toEqual('token');
      });
  });
});
