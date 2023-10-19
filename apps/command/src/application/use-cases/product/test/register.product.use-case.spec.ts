import { EventPublisher } from '@domain-command/event';
import { IEventService } from '@domain-command/services';
import { ProductCategory } from '@enums';
import { of } from 'rxjs';
import { RegisterProductUseCase } from '../register.product.use-case';

describe('RegisterProductUseCase', () => {
  let useCase: RegisterProductUseCase;
  let eventService: IEventService;
  let publisher: EventPublisher;

  beforeEach(() => {
    eventService = {
      validateUnique: jest.fn(),
      isExist: jest.fn(),
      create: jest.fn(),
    } as unknown as jest.Mocked<IEventService>;
    publisher = {
      publish: jest.fn(),
    } as unknown as jest.Mocked<EventPublisher>;
    useCase = new RegisterProductUseCase(eventService, publisher);
  });

  it('poder registrar un producto', (done) => {
    // Arrange
    const product = {
      name: 'Coca Cola',
      category: ProductCategory.ConstructionHardware,
      price: 1000,
      description: 'Bebida gaseosa',
      quantity: 10,
      branchId: '3c491ce5-ee83-41c7-8d49-1dd0cc504065',
    };

    jest.spyOn(eventService, 'validateUnique').mockReturnValueOnce(of(false));

    jest.spyOn(eventService, 'isExist').mockReturnValueOnce(of(true as any));

    jest.spyOn(eventService, 'create').mockReturnValueOnce(
      of({
        id: '75ac97c6-c5f3-493b-a180-71beff254b07',
        typeName: 'RegisteredProduct',
        eventBody: {},
      } as any),
    );

    // Act
    useCase.execute(product).subscribe((data) => {
      // Assert
      expect(data).toBeDefined();
      expect(eventService.validateUnique).toHaveBeenCalledWith(
        {
          name: 'name',
          value: product.name,
        },
        ['registered.product'],
        product.branchId,
      );
      expect(eventService.isExist).toHaveBeenCalledWith(product.branchId, [
        'registered.branch',
      ]);
      expect(eventService.create).toHaveBeenCalledWith(
        {
          id: expect.any(String),
          name: product.name,
          category: product.category,
          price: product.price,
          description: product.description,
          quantity: product.quantity,
          branchId: product.branchId,
        },
        'registered.product',
      );
      expect(publisher.publish).toHaveBeenCalled();
      done();
    });
  });

  it('no poder registrar un producto si el nombre ya existe', (done) => {
    // Arrange
    const product = {
      name: 'Coca Cola',
      category: ProductCategory.ConstructionHardware,
      price: 1000,
      description: 'Bebida gaseosa',
      quantity: 10,
      branchId: '3c491ce5-ee83-41c7-8d49-1dd0cc504065',
    };

    jest.spyOn(eventService, 'validateUnique').mockReturnValueOnce(of(true));

    // Act
    useCase.execute(product).subscribe({
      error(err) {
        // Assert
        expect(err).toBeDefined();
        expect(eventService.validateUnique).toHaveBeenCalledWith(
          {
            name: 'name',
            value: product.name,
          },
          ['registered.product'],
          product.branchId,
        );
        expect(eventService.create).not.toHaveBeenCalled();
        expect(err.message).toEqual('El nombre del producto ya existe');
        expect(publisher.publish).not.toHaveBeenCalled();
        done();
      },
    });
  });

  it('no poder registrar un producto si la sucursal no existe', (done) => {
    // Arrange
    const product = {
      name: 'Coca Cola',
      category: ProductCategory.ConstructionHardware,
      price: 1000,
      description: 'Bebida gaseosa',
      quantity: 10,
      branchId: '3c491ce5-ee83-41c7-8d49-1dd0cc504065',
    } as any;

    jest.spyOn(eventService, 'validateUnique').mockReturnValueOnce(of(false));

    jest.spyOn(eventService, 'isExist').mockReturnValueOnce(of(false));

    // Act
    useCase.execute(product).subscribe({
      error(err) {
        // Assert
        expect(err).toBeDefined();
        expect(eventService.validateUnique).toHaveBeenCalledWith(
          {
            name: 'name',
            value: product.name,
          },
          ['registered.product'],
          product.branchId,
        );
        expect(eventService.isExist).toHaveBeenCalledWith(product.branchId, [
          'registered.branch',
        ]);
        expect(err.message).toEqual('La sucursal no existe');
        expect(publisher.publish).not.toHaveBeenCalled();
        done();
      },
    });
  });
});
