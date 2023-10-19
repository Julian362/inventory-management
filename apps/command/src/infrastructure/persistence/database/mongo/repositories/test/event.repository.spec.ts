import { TypeNamesEnum } from '@enums';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { EventMongo } from '../../schemas';
import { EventRepository } from '../event.repository';

describe('EventRepository', () => {
  let eventRepository: EventRepository;
  const mockPatientRepository = {
    create: jest.fn(),
    findById: jest.fn(),
    findOne: jest.fn(),
    sort: jest.fn(),
    find: jest.fn(),
    exec: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventRepository,
        {
          provide: getModelToken(EventMongo.name),
          useValue: mockPatientRepository,
        },
      ],
    }).compile();

    eventRepository = module.get<EventRepository>(EventRepository);
  });

  it('poder crear un evento', () => {
    // Arrange
    const event = {
      aggregateRootId: '5d31743e-2c7f-451d-b71d-284b6cfc6003',
      eventBody: {
        id: 'a1686c65-6f8d-467b-af5a-7ee4656b4910',
        name: 'name',
      } as any,
      occurredOn: new Date(),
      typeName: 'ProductCreated',
    };
    mockPatientRepository.create.mockReturnValue(Promise.resolve(event));
    // Act
    const result = eventRepository.create(event);

    // Assert
    result.subscribe((event) => {
      expect(event).toEqual(event);
    });
  });

  it('poder buscar un evento por id', () => {
    // Arrange
    const event = {
      aggregateRootId: '5d31743e-2c7f-451d-b71d-284b6cfc6003',
      eventBody: {
        id: 'a1686c65-6f8d-467b-af5a-7ee4656b4910',
        name: 'name',
      } as any,
      occurredOn: new Date(),
      typeName: 'ProductCreated',
    };
    mockPatientRepository.findById = jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue(event),
    });
    // Act
    const result = eventRepository.findById(event.aggregateRootId);

    // Assert
    result.subscribe((event) => {
      expect(event).toEqual(event);
    });
  });

  it('poder buscar un evento por id de entidad', () => {
    // Arrange
    const event = {
      aggregateRootId: '5d31743e-2c7f-451d-b71d-284b6cfc6003',
      eventBody: {
        id: 'a1686c65-6f8d-467b-af5a-7ee4656b4910',
        name: 'name',
      } as any,
      occurredOn: new Date(),
      typeName: TypeNamesEnum.ChangedProductQuantity,
    };
    (mockPatientRepository.findOne as any).mockImplementation(() => ({
      exec: () => Promise.resolve(event),
      sort: () => ({
        exec: () => Promise.resolve(event),
      }),
    }));

    // Act
    const result = eventRepository.findByEntityId(event.eventBody.id, [
      TypeNamesEnum.ChangedProductQuantity,
    ]);

    // Assert
    result.subscribe((event) => {
      expect(event).toEqual(event);
    });
  });

  it('poder validar que un campo sea unico', () => {
    // Arrange
    const field = {
      name: 'name',
      value: 'name',
    };

    // Act
    const result = eventRepository.validateUnique(field);
    (mockPatientRepository.findOne as any).mockImplementation(() => ({
      exec: () => Promise.resolve(event),
    }));

    // Assert
    result.subscribe((event) => {
      expect(event).toEqual(true);
    });
  });

  it('poder calcular el total de eventos', () => {
    // Arrange
    const event = [
      {
        aggregateRootId: '5d31743e-2c7f-451d-b71d-284b6cfc6003',
        eventBody: {
          id: 'a1686c65-6f8d-467b-af5a-7ee4656b4910',
          name: 'name',
        } as any,
        occurredOn: new Date(),
        typeName: 'ProductCreated',
      },
    ];
    (mockPatientRepository.find as any).mockImplementation(() => ({
      exec: () => Promise.resolve(event),
    }));
    // Act
    const result = eventRepository.calculateTotal();

    // Assert
    result.subscribe((count) => {
      expect(count).toEqual(2);
    });
  });
});
