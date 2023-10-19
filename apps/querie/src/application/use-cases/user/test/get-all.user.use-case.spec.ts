import { IUserDomainService } from '@domain/services';
import { RolesUserEnum } from '@enums';
import { of } from 'rxjs';
import { GetAllUserUseCase } from '../get-all.user.use-case';

describe('GetAllUserUseCase', () => {
  let useCase: GetAllUserUseCase;
  let userService: IUserDomainService;

  beforeEach(() => {
    userService = {
      getAllUsers: jest.fn(),
    } as any;
    useCase = new GetAllUserUseCase(userService);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should be getAllUsers', () => {
    // Arrange
    const response = [
      {
        id: '79213d79-ce97-4919-85a0-d73e93b8c586',
        email: 'email@email.com',
        role: RolesUserEnum.Admin,
      },
    ];
    jest
      .spyOn(userService, 'getAllUsers')
      .mockReturnValueOnce(of(response as any));

    // Act and Assert
    useCase.execute().subscribe((res) => {
      expect(res).toBe(response);
    });
  });
});
