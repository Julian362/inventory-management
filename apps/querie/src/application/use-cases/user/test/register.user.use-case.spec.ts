import { IUserDomainService } from '@domain/services';
import { RolesUserEnum } from '@enums';
import { of } from 'rxjs';
import { RegisterUserUseCase } from '../register.user.use-case';

describe('RegisterUserUseCase', () => {
  let useCase: RegisterUserUseCase;
  let userService: IUserDomainService;

  beforeEach(() => {
    userService = {
      createUser: jest.fn(),
    } as unknown as jest.Mocked<IUserDomainService>;
    useCase = new RegisterUserUseCase(userService);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should be registerUser', () => {
    // Arrange
    const response = {
      id: '79213d79-ce97-4919-85a0-d73e93b8c586',
      email: 'email@email.com',
      role: RolesUserEnum.Admin,
    };
    jest
      .spyOn(userService, 'createUser')
      .mockReturnValueOnce(of(response as any));

    // Act and Assert
    useCase
      .execute({
        email: 'email@email.com',
        fullName: {
          firstName: 'firstName',
          lastName: 'lastName',
        },
        branchId: '7a1454a8-8fba-4f5f-b148-acfb270c0a9f',
        password: 'Ensayo18',
        role: RolesUserEnum.Admin,
      })
      .subscribe((res) => {
        expect(res).toBe(response);
      });
  });
});
