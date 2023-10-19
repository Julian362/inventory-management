import { RegisterUserUseCase } from '@applications-jwt/use-cases';
import { TypeNamesEnum } from '@enums';
import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import { JWTSubscriber } from '../jwt.subscriber';

describe('JwtSubscriber', () => {
  let jwtSubscriber: JWTSubscriber;
  let registerUseCase: RegisterUserUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JWTSubscriber],
      providers: [
        {
          provide: RegisterUserUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    jwtSubscriber = module.get<JWTSubscriber>(JWTSubscriber);
    registerUseCase = module.get<RegisterUserUseCase>(RegisterUserUseCase);
  });

  it('poder crear un usuario', () => {
    // Arrange
    const event = {
      eventBody: {
        id: '453fbe3b-1f5c-468b-b213-0302856fee59',
        fullName: 'name lastName',
        email: 'email@email.com',
        password: 'Ensayo118',
        role: 'role',
        branchId: 'fc5558be-96a9-4e8b-8d4d-42fd0a5e618f',
      },
      occurredOn: new Date(),
      typeName: TypeNamesEnum.RegisteredUser,
      aggregateRootId: '1de46802-b4bc-4035-851c-671ebd2f4d5a',
    };
    const user = {
      id: 'fcd445c4-2050-4b19-a870-3432eeac1da7',
      fullName: 'name lastName',
      branchId: 'fc5558be-96a9-4e8b-8d4d-42fd0a5e618f',
      email: 'email@email.com',
      password: 'Ensayo118',
      role: 'role',
    };
    jest.spyOn(registerUseCase, 'execute').mockReturnValueOnce(of(user));

    // Act
    const result = jwtSubscriber.toCreateUser(event);

    // Assert
    result.subscribe((user) => {
      expect(user).toEqual(user);
    });
  });
});
