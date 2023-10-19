import { EventPublisher } from '@domain-command/event';
import { RolesUserEnum } from '@enums';
import { EventService } from '@infrastructure-command/services';
import { of } from 'rxjs';
import { RegisterUserUseCase } from '../register.user.use-case';

describe('RegisterUserUseCase', () => {
  let useCase: RegisterUserUseCase;
  let eventService: EventService;
  let publisher: EventPublisher;

  beforeEach(async () => {
    eventService = {
      validaUnique: jest.fn(),
      isExist: jest.fn(),
      create: jest.fn(),
    } as unknown as jest.Mocked<EventService>;
    publisher = {
      publish: jest.fn(),
    } as unknown as jest.Mocked<EventPublisher>;
    useCase = new RegisterUserUseCase(eventService, publisher);
  });

  it('poder registrarse', () => {
    // Arrange
    const user = {
      fullName: {
        firstName: 'firstName',
        lastName: 'lastName',
      },
      email: 'email@email.com',
      password: 'Ensayo17',
      role: RolesUserEnum.Admin,
      branchId: 'fb0596e6-b23e-4857-ad78-0194cc01d2e1',
    };
    jest.spyOn(eventService, 'validaUnique').mockReturnValueOnce(of(false));
    jest.spyOn(eventService, 'isExist').mockReturnValueOnce(of(true));
    jest.spyOn(eventService, 'create').mockReturnValueOnce(of({} as any));

    // Act
    useCase.execute(user).subscribe(() => {
      // Assert
      expect(eventService.validaUnique).toBeCalled();
      expect(eventService.isExist).toBeCalled();
      expect(eventService.create).toBeCalled();
      expect(publisher.publish).toBeCalled();
    });
  });

  it('no poder registrarse por email duplicado', () => {
    // Arrange
    const user = {
      fullName: {
        firstName: 'firstName',
        lastName: 'lastName',
      },
      email: 'email@email.com',
      password: 'Ensayo17',
      role: RolesUserEnum.Admin,
      branchId: 'fb0596e6-b23e-4857-ad78-0194cc01d2e1',
    };
    jest.spyOn(eventService, 'validaUnique').mockReturnValueOnce(of(true));

    // Act
    useCase.execute(user).subscribe({
      error(err) {
        // Assert
        expect(err.message).toBe('El correo del usuario ya existe');
      },
    });
  });

  it('no poder registrarse por sucursal no existente', () => {
    // Arrange
    const user = {
      fullName: {
        firstName: 'firstName',
        lastName: 'lastName',
      },
      email: 'email@email.com',
      password: 'Ensayo17',
      role: RolesUserEnum.Admin,
      branchId: 'fb0596e6-b23e-4857-ad78-0194cc01d2e1',
    };
    jest.spyOn(eventService, 'validaUnique').mockReturnValueOnce(of(false));
    jest.spyOn(eventService, 'isExist').mockReturnValueOnce(of(false));
    jest.spyOn(eventService, 'create').mockReturnValueOnce(of({} as any));

    // Act
    useCase.execute(user).subscribe({
      error(err) {
        // Assert
        expect(err.message).toBe('La sucursal no existe');
      },
    });
  });
});
