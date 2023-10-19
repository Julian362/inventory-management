import { IUserDomainService } from '@domain/services';
import { RolesUserEnum } from '@enums';
import { of } from 'rxjs';
import { GetUserUseCase } from '../get.user.use-case';

describe('GetUserUseCase', () => {
  let useCase: GetUserUseCase;
  let userService: IUserDomainService;

  beforeEach(() => {
    userService = {
      getUserById: jest.fn(),
    } as unknown as jest.Mocked<IUserDomainService>;
    useCase = new GetUserUseCase(userService);
  });

  it('poder obtener un usuario', () => {
    // Arrange
    const response = {
      id: '79213d79-ce97-4919-85a0-d73e93b8c586',
      email: 'email@email.com',
      role: RolesUserEnum.Admin,
    };
    jest
      .spyOn(userService, 'getUserById')
      .mockReturnValueOnce(of(response as any));

    // Act and Assert
    useCase.execute('79213d79-ce97-4919-85a0-d73e93b8c586').subscribe((res) => {
      expect(res).toBe(response);
    });
  });
});
