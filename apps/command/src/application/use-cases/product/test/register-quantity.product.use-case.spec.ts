import { EventPublisher } from '@domain-command/event';
import { IEventService } from '@domain-command/services';
import { of } from 'rxjs';
import { ModifyQuantityProductUseCase } from '../register-quantity.product.use-case';

describe('RegisterQuantityProductUseCase', () => {
  let useCase: ModifyQuantityProductUseCase;
  let eventService: IEventService;
  let publisher: EventPublisher;

  beforeEach(() => {
    eventService = {
      findByEntityId: jest.fn(),
      create: jest.fn(),
    } as unknown as jest.Mocked<IEventService>;
    publisher = {
      publish: jest.fn(),
    } as unknown as jest.Mocked<EventPublisher>;
    useCase = new ModifyQuantityProductUseCase(eventService, publisher);
  });

  it('poder modificar la cantidad de un producto', (done) => {
    // Arrange
    const product = {
      id: '3c491ce5-ee83-41c7-8d49-1dd0cc504065',
      quantity: 10,
    };
    const event = {
      id: '0b3577f6-ad43-44b9-b739-5eecfa4ce9d9',
      typeName: 'RegisteredProduct',
      eventBody: product,
    };

    jest
      .spyOn(eventService, 'findByEntityId')
      .mockReturnValueOnce(of(event as any));

    jest.spyOn(eventService, 'create').mockReturnValueOnce(
      of({
        id: '75ac97c6-c5f3-493b-a180-71beff254b07',
        typeName: 'RegisteredProductQuantity',
        eventBody: {},
      } as any),
    );

    // Act
    useCase.execute(product.id, product.quantity).subscribe((data) => {
      // Assert
      expect(data).toBeDefined();
      expect(eventService.findByEntityId).toHaveBeenCalledWith(product.id, [
        'registered.product',
        'registered.product.quantity.purchase',
        'registered.product.quantity.customer.sale',
        'registered.product.quantity.seller.sale',
      ]);
      expect(eventService.create).toHaveBeenCalledWith(
        {
          id: expect.any(String),
          quantity: product.quantity,
        },
        'registered.product.quantity.purchase',
      );
      expect(publisher.publish).toHaveBeenCalled();
      done();
    });
  });

  it('lanzar error si el producto no existe', (done) => {
    // Arrange
    const product = {
      id: '47a7e928-eb87-4d61-a82b-7b5b4388d156',
      quantity: 10,
    };

    jest.spyOn(eventService, 'findByEntityId').mockReturnValueOnce(of(null));

    // Act
    useCase.execute(product.id, product.quantity).subscribe(
      () => {},
      (err) => {
        // Assert
        expect(err).toBeDefined();
        expect(err.message).toBe('el producto no existe');
        expect(eventService.findByEntityId).toHaveBeenCalledWith(product.id, [
          'registered.product',
          'registered.product.quantity.purchase',
          'registered.product.quantity.customer.sale',
          'registered.product.quantity.seller.sale',
        ]);
        done();
      },
    );
  });
});
