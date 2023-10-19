import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { JWTService } from '../jtw.service';

describe('JWTService', () => {
  let service: JWTService;
  let jwtService: JwtService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JWTService,
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
            verify: jest.fn(),
            decode: jest.fn(),
          },
        },
      ],
    }).compile();
    jwtService = module.get<JwtService>(JwtService);
    service = module.get<JWTService>(JWTService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('poder crear un token', () => {
    // Arrange
    const data = {
      userId: '1',
      role: 'admin',
      branchId: '1',
    } as any;
    jest.spyOn(jwtService, 'sign').mockReturnValue('token');
    // Act
    const result = service.generateToken(data);
    // Assert
    result.subscribe((res) => {
      expect(res.token).toEqual('token');
    });
  });

  it('poder verificar un token', () => {
    // Arrange
    const token = 'token';
    const id = '1';
    jest.spyOn(jwtService, 'verify').mockReturnValue({
      true: true,
    });
    jest.spyOn(jwtService, 'decode').mockReturnValue({ userId: '1' });
    // Act
    const result = service.verify(token, id);
    // Assert
    result.subscribe((res) => {
      expect(res).toEqual(true);
    });
  });

  it('poder verificar un token con id diferente', () => {
    // Arrange
    const token = 'token';
    const id = '1';
    jest.spyOn(jwtService, 'verify').mockReturnValue({
      true: true,
    });
    jest.spyOn(jwtService, 'decode').mockReturnValue({ userId: '2' });
    // Act
    const result = service.verify(token, id);
    // Assert
    result.subscribe((res) => {
      expect(res).toEqual(false);
    });
  });
  it('poder verificar un token expirado', () => {
    // Arrange
    const token = 'token';
    const id = '1';
    jest
      .spyOn(jwtService, 'verify')
      .mockReturnValue(new Error('TokenExpiredError'));
    jest.spyOn(jwtService, 'decode').mockReturnValue({ userId: '1' });
    // Act
    const result = service.verify(token, id);
    // Assert
    result.subscribe((res) => {
      expect(res).toEqual(true);
    });
  });
  it('poder verificar un token expirado con id diferente', () => {
    // Arrange
    const token = 'token';
    const id = '1';
    jest
      .spyOn(jwtService, 'verify')
      .mockReturnValue(new Error('TokenExpiredError'));
    jest.spyOn(jwtService, 'decode').mockReturnValue({ userId: '2' });
    // Act
    const result = service.verify(token, id);
    // Assert
    result.subscribe((res) => {
      expect(res).toEqual(false);
    });
  });
  it('poder verificar un token con error diferente', () => {
    // Arrange
    const token = 'token';
    const id = '1';
    jest.spyOn(jwtService, 'verify').mockReturnValue(new Error('Error'));
    jest.spyOn(jwtService, 'decode').mockReturnValue({ userId: '2' });
    // Act
    const result = service.verify(token, id);
    // Assert
    result.subscribe((res) => {
      expect(res).toEqual(false);
    });
  });
});
