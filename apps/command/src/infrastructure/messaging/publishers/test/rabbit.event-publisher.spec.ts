import { TypeNamesEnum } from '@enums';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Test } from '@nestjs/testing';
import { of } from 'rxjs';
import { RabbitPublisher } from '../rabbit.event-publisher';

describe('RabbitEventPublisher', () => {
  let rabbitPublisher: RabbitPublisher;
  let mockProxy: jest.Mocked<{
    publish: jest.Mock;
  }>;

  beforeEach(async () => {
    const app = await Test.createTestingModule({
      providers: [
        RabbitPublisher,
        {
          provide: AmqpConnection,
          useValue: {
            publish: jest.fn(),
          },
        },
      ],
    }).compile();

    rabbitPublisher = app.get<RabbitPublisher>(RabbitPublisher);

    mockProxy = app.get(AmqpConnection);
  });

  it('puede emitir un evento', async () => {
    // Arrange
    const exchange = 'exchange';
    const pattern = TypeNamesEnum.ChangedProductQuantity;
    const data = { data: 'data' };
    jest.spyOn(mockProxy, 'publish').mockImplementation(() => of('ok'));

    // Act
    const result = await rabbitPublisher.emit(exchange, pattern, data);
    result.subscribe((res) => {
      // Assert
      expect(res).toBe('ok');
    });
  });
});
