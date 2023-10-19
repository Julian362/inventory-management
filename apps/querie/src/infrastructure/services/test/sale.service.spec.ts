import { SaleRepository } from '@infrastructure-querie/persistence';
import { Test, TestingModule } from '@nestjs/testing';
import { SaleService } from '../sale.service';

describe('SaleService', () => {
  let service: SaleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SaleService,
        {
          provide: SaleRepository,
          useValue: {
            create: jest.fn(),
            findById: jest.fn(),
            findAll: jest.fn(),
            update: jest.fn(),
            getByName: jest.fn(),
          },
        },
      ],
    }).compile();
    service = module.get<SaleService>(SaleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
