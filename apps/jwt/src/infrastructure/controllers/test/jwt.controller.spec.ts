import { RolesUserEnum } from '@enums';
import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import { GetUserUseCase } from '../../../application/use-cases/user/get.user.use-case';
import { RefreshTokenUseCase } from '../../../application/use-cases/user/refresh.use-case';
import { JWTController } from '../jwt.controller';
describe('JwtController', () => {
  let Controller: JWTController;
  let login: GetUserUseCase;
  let refreshTokenUseCase: RefreshTokenUseCase;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [JWTController],
      providers: [
        {
          provide: GetUserUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: RefreshTokenUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();
    Controller = app.get<JWTController>(JWTController);
    login = app.get<GetUserUseCase>(GetUserUseCase);
    refreshTokenUseCase = app.get<RefreshTokenUseCase>(RefreshTokenUseCase);
  });

  it('inicio de sesion', () => {
    // Arrange
    const data = {
      email: 'email@email.com',
      password: 'Ensayo17',
    };
    const response = {
      token: 'token',
      data: {
        id: '79213d79-ce97-4919-85a0-d73e93b8c586',
        email: 'email@emial.com',
        role: RolesUserEnum.Admin,
      },
    };
    jest.spyOn(login, 'execute').mockReturnValueOnce(of(response as any));

    // Act and Assert
    Controller.toGetUser(data).subscribe((res) => {
      expect(res).toBe(response);
    });
  });

  it('refrescar token', () => {
    // Arrange
    const data = {
      id: '79213d79-ce97-4919-85a0-d73e93b8c586',
      token: 'token',
    };
    const response = 'token';
    jest
      .spyOn(refreshTokenUseCase, 'execute')
      .mockReturnValueOnce(of(response as any));

    // Act and Assert
    Controller.refreshToken(data).subscribe((res) => {
      expect(res).toStrictEqual({
        token: response,
      });
    });
  });
});
