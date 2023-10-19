import { EventModelDomain } from '@domain/utils/models';
import { TypeNamesEnum } from '@enums';
import { Test, TestingModule } from '@nestjs/testing';
import { Observable, of } from 'rxjs';
import { EventRepository } from '../../repositories';
import { EventMongoService } from '../event.service';

describe('EventMongoService', () => {
  let eventMongoService: EventMongoService;
  let eventRepository: EventRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventMongoService,
        {
          provide: EventRepository,
          useValue: {
            findByEntityId: jest.fn(),
            create: jest.fn(),
            findById: jest.fn(),
            validateUnique: jest.fn(),
            calculateTotal: jest.fn(),
          },
        },
      ],
    }).compile();
    eventMongoService = module.get<EventMongoService>(EventMongoService);
    eventRepository = module.get<EventRepository>(EventRepository);
  });

  it('debería verificar si un evento existe por ID y tipo', (done) => {
    // Arrange
    const id = '123';
    jest.spyOn(eventRepository, 'findByEntityId').mockReturnValue(of(null));

    // Act
    const result: Observable<boolean> = eventMongoService.isExist(id, [
      TypeNamesEnum.RegisteredBranch,
    ]);

    // Assert
    result.subscribe((exists) => {
      expect(exists).toBe(false);
      expect(eventRepository.findByEntityId).toHaveBeenCalledWith(id, [
        TypeNamesEnum.RegisteredBranch,
      ]);
      done();
    });
  });

  it('debería verificar si un array de eventos existe por ID y tipo', (done) => {
    // Arrange
    const ids = ['123', '456'];
    jest.spyOn(eventRepository, 'findByEntityId').mockReturnValue(
      of([
        {
          id: '123',
          typeName: TypeNamesEnum.RegisteredBranch,
          eventBody: {} as any,
        } as any,
        {
          id: '456',
          typeName: TypeNamesEnum.RegisteredBranch,
          eventBody: {} as any,
        } as any,
      ] as any),
    );
    ids.map((id) =>
      eventMongoService.isExist(id, [TypeNamesEnum.RegisteredBranch]),
    );

    // Act
    const result: Observable<boolean> = eventMongoService.isExistArray(ids);

    // Assert
    result.subscribe((exists) => {
      expect(exists).toBe(true);
      expect(eventRepository.findByEntityId).toHaveBeenCalledWith(ids[0], [
        TypeNamesEnum.RegisteredBranch,
      ]);
      expect(eventRepository.findByEntityId).toHaveBeenCalledWith(ids[1], [
        TypeNamesEnum.RegisteredBranch,
      ]);
      done();
    });
  });

  it('debería validar la unicidad de un campo', (done) => {
    // Arrange
    const field = { name: 'fieldName', value: 'fieldValue' };
    const aggregateRootId = '123';
    jest.spyOn(eventRepository, 'validateUnique').mockReturnValue(of(true));

    // Act
    const result: Observable<boolean> = eventMongoService.validateUnique(
      field,
      [TypeNamesEnum.RegisteredBranch],
      aggregateRootId,
    );

    // Assert
    result.subscribe((isValid) => {
      expect(isValid).toBe(true);
      expect(eventRepository.validateUnique).toHaveBeenCalledWith(
        field,
        aggregateRootId,
      );
      done();
    });
  });

  it('debería crear un evento', (done) => {
    // Arrange
    const data = new EventModelDomain();
    data.aggregateRootId = 'de7292e0-93fa-4ad0-95d9-568679cea31f';
    data.eventBody = {
      id: 'de7292e0-93fa-4ad0-95d9-568679cea31f',
      name: 'branch name',
    } as any;
    data.occurredOn = new Date();
    data.typeName = TypeNamesEnum.RegisteredBranch;
    jest.spyOn(eventRepository, 'create').mockReturnValue(of(data));

    // Act
    const result: Observable<EventModelDomain> = eventMongoService.create(
      data.eventBody,
      TypeNamesEnum.RegisteredBranch,
    );

    // Assert
    result.subscribe((createdEvent) => {
      expect(createdEvent.aggregateRootId).toEqual(data.aggregateRootId);
      expect({
        ...createdEvent.eventBody,
        occurredOn: new Date('2021-07-01T00:00:00.000Z'),
      }).toEqual({
        ...data.eventBody,
        occurredOn: new Date('2021-07-01T00:00:00.000Z'),
      });
      expect(createdEvent.typeName).toEqual(data.typeName);
      expect(eventRepository.create).toHaveBeenCalled();
      done();
    });
  });

  it('debería obtener un evento por ID', (done) => {
    // Arrange
    const eventId = '123';
    const eventData = new EventModelDomain();
    jest.spyOn(eventRepository, 'findById').mockReturnValue(of(eventData));

    // Act
    const result: Observable<EventModelDomain> =
      eventMongoService.findById(eventId);

    // Assert
    result.subscribe((foundEvent) => {
      expect(foundEvent).toEqual(eventData);
      expect(eventRepository.findById).toHaveBeenCalledWith(eventId);
      done();
    });
  });

  it('debería obtener un evento por ID y tipos', (done) => {
    // Arrange
    const eventId = '123';
    const typesNames = [
      TypeNamesEnum.RegisteredProduct,
      TypeNamesEnum.RegisteredSellerSale,
    ];
    const eventData = new EventModelDomain();
    jest
      .spyOn(eventRepository, 'findByEntityId')
      .mockReturnValue(of(eventData));

    // Act
    const result: Observable<EventModelDomain> =
      eventMongoService.findByEntityId(eventId, typesNames);

    // Assert
    result.subscribe((foundEvent) => {
      expect(foundEvent).toEqual(eventData);
      expect(eventRepository.findByEntityId).toHaveBeenCalledWith(
        eventId,
        typesNames,
      );
      done();
    });
  });

  it('debería calcular el total de eventos', (done) => {
    // Arrange
    const total = 42;
    jest.spyOn(eventRepository, 'calculateTotal').mockReturnValue(of(total));

    // Act
    const result: Observable<number> = eventMongoService.calculateTotal();

    // Assert
    result.subscribe((calculatedTotal) => {
      expect(calculatedTotal).toEqual(total);
      expect(eventRepository.calculateTotal).toHaveBeenCalled();
      done();
    });
  });
});
