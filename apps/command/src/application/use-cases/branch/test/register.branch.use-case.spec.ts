import { EventPublisher } from '@domain-command/event';
import { EventService } from '@infrastructure-command/services';
import { of } from 'rxjs';
import { RegisterBranchUseCase } from '../register.branch.use-case';

describe('RegisterBranchUseCase', () => {
  let useCase: RegisterBranchUseCase;
  let eventService: EventService;
  let eventPublisher: EventPublisher;

  beforeEach(async () => {
    eventService = {
      validateUnique: jest.fn(),
      create: jest.fn(),
      isExist: jest.fn(),
      isExistArray: jest.fn(),
      calculateTotal: jest.fn(),
      findById: jest.fn(),
    } as unknown as jest.Mocked<EventService>;
    eventPublisher = {
      publish: jest.fn(),
    } as unknown as jest.Mocked<EventPublisher>;
    useCase = new RegisterBranchUseCase(eventService, eventPublisher);
  });

  it('poder crear una sucursal', (done) => {
    // Arrange
    const branch = {
      name: 'sucursal 1',
      location: {
        city: 'Bogota',
        country: 'Colombia',
      },
    };

    jest.spyOn(eventService, 'validateUnique').mockReturnValueOnce(of(false));

    jest.spyOn(eventService, 'create').mockReturnValueOnce(
      of({
        id: '123',
        typeName: 'RegisteredBranch',
        eventBody: {},
      } as any),
    );

    // Act
    useCase.execute(branch).subscribe((data) => {
      // Assert
      expect(data).toBeDefined();
      expect(eventService.validateUnique).toHaveBeenCalledWith(
        { name: 'name', value: branch.name },
        ['registered.branch'],
      );
      expect(eventService.create).toHaveBeenCalledWith(
        {
          id: expect.any(String),
          name: branch.name,
          location: branch.location.city + ',' + branch.location.country,
        },
        'registered.branch',
      );
      expect(eventPublisher.publish).toHaveBeenCalled();
      done();
    });
  });

  it('no poder crear una sucursal con un nombre que ya existe', (done) => {
    // Arrange
    const branch = {
      name: 'sucursal 1',
      location: {
        city: 'Bogota',
        country: 'Colombia',
      },
    };

    jest.spyOn(eventService, 'validateUnique').mockReturnValueOnce(of(true));

    // Act
    useCase.execute(branch).subscribe({
      error(err) {
        // Assert
        expect(err).toBeDefined();
        expect(err.message).toEqual('El nombre de la sucursal ya existe');
        expect(eventService.validateUnique).toHaveBeenCalledWith(
          { name: 'name', value: branch.name },
          ['registered.branch'],
        );
        expect(eventService.create).not.toHaveBeenCalled();
        expect(eventPublisher.publish).not.toHaveBeenCalled();
        done();
      },
    });
  });
});
