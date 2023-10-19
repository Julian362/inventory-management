import {
  UserPostgresService,
  UserRepository,
} from '@infrastructure-jwt/persistence';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';

describe('UserService', () => {
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserPostgresService,
          useValue: {
            createUser: jest.fn(),
            getUserById: jest.fn(),
            getAllUsers: jest.fn(),
            login: jest.fn(),
            getAllAdmins: jest.fn(),
          },
        },
        {
          provide: UserRepository,
          useValue: {
            createUser: jest.fn(),
            getUserById: jest.fn(),
            getAllUsers: jest.fn(),
            login: jest.fn(),
            getAllAdmins: jest.fn(),
          },
        },
      ],
    }).compile();
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });
});
