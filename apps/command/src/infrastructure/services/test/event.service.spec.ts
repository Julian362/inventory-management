import { EventRepository } from '@infrastructure-command/persistence';
import { Test, TestingModule } from '@nestjs/testing';
import { EventService } from '../event.service';

describe('EventService', () => {
  let service: EventService;
  let repository: EventRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventService,
        {
          provide: EventRepository,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findById: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();
    repository = module.get<EventRepository>(EventRepository);
    service = new EventService(repository);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
