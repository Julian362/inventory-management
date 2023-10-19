import { EventPublisher } from '@domain-command/event';
import { ProductCategory } from '@enums';
import { EventService } from '@infrastructure-command/services';
import { of } from 'rxjs';
import { RegisterSaleUseCase } from '../register-sale.product.use-case';

describe('RegisterSaleUseCase', () => {
  let useCase: RegisterSaleUseCase;
  let eventService: EventService;
  let publisher: EventPublisher;

  beforeEach(() => {
    eventService = {
      findByEntityId: jest.fn(),
      isExistArray: jest.fn(),
      create: jest.fn(),
      findByProductId: jest.fn(),
      calculateTotal: jest.fn(),
    } as unknown as jest.Mocked<EventService>;
    publisher = {
      publish: jest.fn(),
    } as unknown as jest.Mocked<EventPublisher>;
    useCase = new RegisterSaleUseCase(eventService, publisher);
  });

  it('puede registrar una venta', (done) => {
    // Arrange
    const data = {
      branchId: '3c491ce5-ee83-41c7-8d49-1dd0cc504065',
      products: [
        {
          id: '3c491ce5-ee83-41c7-8d49-1dd0cc504065',
          quantity: 10,
        },
      ],
    };
    const product = {
      id: '3c491ce5-ee83-41c7-8d49-1dd0cc504065',
      quantity: 10,
      name: 'test',
      category: ProductCategory.ConstructionHardware,
      price: 10,
      description: 'test',
      branchId: '3c491ce5-ee83-41c7-8d49-1dd0cc504065',
    };

    jest.spyOn(eventService, 'findByEntityId').mockReturnValue(
      of({
        id: '6c12128c-b811-494a-ab51-f7b86bb6e0c9',
        typeName: 'registered.sale',
        eventBody: product,
      } as any),
    );

    jest.spyOn(eventService, 'isExistArray').mockReturnValue(of(true));

    jest.spyOn(eventService, 'calculateTotal').mockReturnValue(of(2));

    jest.spyOn(eventService, 'create').mockReturnValue(
      of({
        id: '6c12128c-b811-494a-ab51-f7b86bb6e0c9',
        typeName: 'registered.sale',
        eventBody: data,
      } as any),
    );

    // Act
    useCase.execute(data).subscribe((data) => {
      // Assert
      expect(data).toBeDefined();
      expect(eventService.findByEntityId).toHaveBeenCalled();
      expect(eventService.isExistArray).toHaveBeenCalled();
      expect(eventService.calculateTotal).toHaveBeenCalled();
      expect(eventService.create).toHaveBeenCalled();
      expect(publisher.publish).toHaveBeenCalled();
      done();
    });
  });

  it('no puede registrar una venta si no existen los productos', (done) => {
    // Arrange
    const data = {
      branchId: '3c491ce5-ee83-41c7-8d49-1dd0cc504065',
      products: [
        {
          id: '3c491ce5-ee83-41c7-8d49-1dd0cc504065',
          quantity: 10,
        },
      ],
    };
    jest
      .spyOn(eventService, 'findByEntityId')
      .mockReturnValueOnce(
        of({
          id: '6c12128c-b811-494a-ab51-f7b86bb6e0c9',
          typeName: 'registered.sale',
          eventBody: data,
        } as any),
      )
      .mockReturnValueOnce(of(null));
    jest.spyOn(eventService, 'isExistArray').mockReturnValue(of(false));
    // Act
    useCase.execute(data).subscribe(
      () => {},
      (error) => {
        // Assert
        expect(error.message).toEqual('Los productos no existen en el sistema');
        expect(eventService.findByEntityId).toHaveBeenCalled();
        expect(eventService.calculateTotal).not.toHaveBeenCalled();
        expect(eventService.create).not.toHaveBeenCalled();
        expect(publisher.publish).not.toHaveBeenCalled();
        done();
      },
    );
  });

  it('no existe la sucursal', (done) => {
    // Arrange
    const data = {
      branchId: '3c491ce5-ee83-41c7-8d49-1dd0cc504065',
      products: [
        {
          id: '3c491ce5-ee83-41c7-8d49-1dd0cc504065',
          quantity: 10,
        },
      ],
    };
    jest.spyOn(eventService, 'findByEntityId').mockReturnValue(of(null));
    // Act
    useCase.execute(data).subscribe({
      error: (error) => {
        // Assert
        expect(error.message).toEqual('el id de la sucursal no existe');
        expect(eventService.findByEntityId).toHaveBeenCalled();
        expect(eventService.calculateTotal).not.toHaveBeenCalled();
        expect(eventService.create).not.toHaveBeenCalled();
        expect(publisher.publish).not.toHaveBeenCalled();
        done();
      },
    });
  });

  it(' productos no existen en la sucursal', (done) => {
    // Arrange
    const data = {
      branchId: '3c491ce5-ee83-41c7-8d49-1dd0cc504065',
      products: [
        {
          id: '3c491ce5-ee83-41c7-8d49-1dd0cc504065',
          quantity: 10,
        },
      ],
    };
    const product = {
      id: '3c491ce5-ee83-41c7-8d49-1dd0cc504065',
      quantity: 10,
      name: 'test',
      category: ProductCategory.ConstructionHardware,
      price: 10,
      description: 'test',
      branchId: '3c491ce5-ee83-41c7-8d49-1dd0cc504065',
    };

    jest
      .spyOn(eventService, 'findByEntityId')
      .mockReturnValueOnce(
        of({
          id: '6c12128c-b811-494a-ab51-f7b86bb6e0c9',
          typeName: 'registered.sale',
          eventBody: product,
        } as any),
      )
      .mockReturnValueOnce(
        of({
          id: '6c12128c-b811-494a-ab51-f7b86bb6e0c9',
          typeName: 'registered.sale',
          eventBody: {
            ...product,
            id: '966083a6-3e6d-4c24-830a-0e2443f9c43d',
            branchId: '966083a6-3e6d-4c24-830a-0e2443f9c43d',
          },
        } as any),
      );

    jest.spyOn(eventService, 'isExistArray').mockReturnValue(of(true));

    jest.spyOn(eventService, 'calculateTotal').mockReturnValue(of(2));

    jest.spyOn(eventService, 'create').mockReturnValue(
      of({
        id: '6c12128c-b811-494a-ab51-f7b86bb6e0c9',
        typeName: 'registered.sale',
        eventBody: data,
      } as any),
    );

    // Act
    useCase.execute(data).subscribe({
      error(err) {
        // Assert
        expect(err.message).toEqual(
          'el producto test no pertenece a la sucursal',
        );
        expect(eventService.findByEntityId).toHaveBeenCalled();
        expect(eventService.calculateTotal).not.toHaveBeenCalled();
        expect(eventService.create).not.toHaveBeenCalled();
        expect(publisher.publish).not.toHaveBeenCalled();
        done();
      },
    });
  });

  it(' productos sin cantidad necesaria para le venta', (done) => {
    // Arrange
    const data = {
      branchId: '3c491ce5-ee83-41c7-8d49-1dd0cc504065',
      products: [
        {
          id: '3c491ce5-ee83-41c7-8d49-1dd0cc504065',
          quantity: 10,
        },
      ],
    };
    const product = {
      id: '3c491ce5-ee83-41c7-8d49-1dd0cc504065',
      quantity: 1,
      name: 'test',
      category: ProductCategory.ConstructionHardware,
      price: 10,
      description: 'test',
      branchId: '3c491ce5-ee83-41c7-8d49-1dd0cc504065',
    };

    jest
      .spyOn(eventService, 'findByEntityId')
      .mockReturnValueOnce(
        of({
          id: '6c12128c-b811-494a-ab51-f7b86bb6e0c9',
          typeName: 'registered.sale',
          eventBody: product,
        } as any),
      )
      .mockReturnValueOnce(
        of({
          id: '6c12128c-b811-494a-ab51-f7b86bb6e0c9',
          typeName: 'registered.sale',
          eventBody: product,
        } as any),
      );

    jest.spyOn(eventService, 'isExistArray').mockReturnValue(of(true));

    jest.spyOn(eventService, 'calculateTotal').mockReturnValue(of(2));

    jest.spyOn(eventService, 'create').mockReturnValue(
      of({
        id: '6c12128c-b811-494a-ab51-f7b86bb6e0c9',
        typeName: 'registered.sale',
        eventBody: data,
      } as any),
    );

    // Act
    useCase.execute(data).subscribe({
      error(err) {
        // Assert
        expect(err.message).toEqual(
          'producto test sin cantidad necesaria para la venta',
        );
        expect(eventService.findByEntityId).toHaveBeenCalled();
        expect(eventService.calculateTotal).not.toHaveBeenCalled();
        expect(eventService.create).not.toHaveBeenCalled();
        expect(publisher.publish).not.toHaveBeenCalled();
        done();
      },
    });
  });
  it(' productos no existen en la sucursal', (done) => {
    // Arrange
    const data = {
      branchId: '3c491ce5-ee83-41c7-8d49-1dd0cc504065',
      products: [
        {
          id: '3c491ce5-ee83-41c7-8d49-1dd0cc504065',
          quantity: 10,
        },
      ],
    };
    const product = {
      id: '3c491ce5-ee83-41c7-8d49-1dd0cc504065',
      quantity: 10,
      name: 'test',
      category: ProductCategory.ConstructionHardware,
      price: 10,
      description: 'test',
      branchId: '3c491ce5-ee83-41c7-8d49-1dd0cc504065',
    };

    jest
      .spyOn(eventService, 'findByEntityId')
      .mockReturnValueOnce(
        of({
          id: '6c12128c-b811-494a-ab51-f7b86bb6e0c9',
          typeName: 'registered.sale',
          eventBody: product,
        } as any),
      )
      .mockReturnValueOnce(
        of({
          id: '6c12128c-b811-494a-ab51-f7b86bb6e0c9',
          typeName: 'registered.sale',
          eventBody: {
            ...product,
            id: '966083a6-3e6d-4c24-830a-0e2443f9c43d',
            branchId: '966083a6-3e6d-4c24-830a-0e2443f9c43d',
          },
        } as any),
      );

    jest.spyOn(eventService, 'isExistArray').mockReturnValue(of(true));

    jest.spyOn(eventService, 'calculateTotal').mockReturnValue(of(2));

    jest.spyOn(eventService, 'create').mockReturnValue(
      of({
        id: '6c12128c-b811-494a-ab51-f7b86bb6e0c9',
        typeName: 'registered.sale',
        eventBody: data,
      } as any),
    );

    // Act
    useCase.execute(data).subscribe({
      error(err) {
        // Assert
        expect(err.message).toEqual(
          'el producto test no pertenece a la sucursal',
        );
        expect(eventService.findByEntityId).toHaveBeenCalled();
        expect(eventService.calculateTotal).not.toHaveBeenCalled();
        expect(eventService.create).not.toHaveBeenCalled();
        expect(publisher.publish).not.toHaveBeenCalled();
        done();
      },
    });
  });
});
