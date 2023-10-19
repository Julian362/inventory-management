import {
  RegisterBranchUseCase,
  RegisterProductUseCase,
  RegisterSaleUseCase,
  RegisterUserUseCase,
  UpdateQuantityProductUseCase,
} from '@applications-querie-/use-cases';
import { TypeNamesEnum } from '@enums';
import { Test, TestingModule } from '@nestjs/testing';
import { SaleEnum } from '@shared/enums/sale.enum';
import { of } from 'rxjs';
import { QuerieSubscriber } from '../querie.subscriber';

describe('QuerieSubscriber', () => {
  let querieSubscriber: QuerieSubscriber;
  let registerUseCase: RegisterProductUseCase;
  let updateUseCase: UpdateQuantityProductUseCase;
  let registerUserUseCase: RegisterUserUseCase;
  let registerBranchUseCase: RegisterBranchUseCase;
  let registerSaleUseCase: RegisterSaleUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuerieSubscriber],
      providers: [
        {
          provide: RegisterProductUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: UpdateQuantityProductUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: RegisterUserUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: RegisterBranchUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: RegisterSaleUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    querieSubscriber = module.get<QuerieSubscriber>(QuerieSubscriber);
    registerUseCase = module.get<RegisterProductUseCase>(
      RegisterProductUseCase,
    );
    updateUseCase = module.get<UpdateQuantityProductUseCase>(
      UpdateQuantityProductUseCase,
    );
    registerUserUseCase = module.get<RegisterUserUseCase>(RegisterUserUseCase);
    registerBranchUseCase = module.get<RegisterBranchUseCase>(
      RegisterBranchUseCase,
    );
    registerSaleUseCase = module.get<RegisterSaleUseCase>(RegisterSaleUseCase);
  });

  it('poder crear un producto', () => {
    // Arrange
    const event = {
      eventBody: {
        id: '1',
        name: 'name',
        price: 100,
        quantity: 10,
        category: 'category',
        description: 'description',
        branchId: '1',
      },
      occurredOn: new Date(),
      typeName: TypeNamesEnum.RegisteredProduct,
      aggregateRootId: '1de46802-b4bc-4035-851c-671ebd2f4d5a',
    };
    const product = {
      name: 'name',
      price: 100,
      quantity: 10,
      category: 'category',
      description: 'description',
      branchId: '55c7e0c4-0a01-4869-b967-5ce5ce2ea508',
    };
    jest.spyOn(registerUseCase, 'execute').mockReturnValueOnce(of(product));

    // Act
    const result = querieSubscriber.toCreateProduct(event);

    // Assert
    result.subscribe((product) => {
      expect(product).toEqual(product);
    });
  });

  it('poder actualizar la cantidad de un producto', () => {
    // Arrange
    const event = {
      eventBody: {
        id: '1',
        name: 'name',
        price: 100,
        quantity: 10,
        category: 'category',
        description: 'description',
        branchId: '1',
      },
      occurredOn: new Date(),
      typeName: TypeNamesEnum.ChangedProductQuantity,
      aggregateRootId: '1de46802-b4bc-4035-851c-671ebd2f4d5a',
    };
    const product = {
      id: '1',
      name: 'name',
      price: 100,
      quantity: 10,
      category: 'category',
      description: 'description',
      branchId: '1',
    };
    jest.spyOn(updateUseCase, 'execute').mockReturnValueOnce(of(product));

    // Act
    const result = querieSubscriber.toUpdateQuantity(event);

    // Assert
    result.subscribe((product) => {
      expect(product).toEqual(product);
    });
  });

  it('poder crear un usuario', () => {
    // Arrange
    const event = {
      eventBody: {
        id: '453fbe3b-1f5c-468b-b213-0302856fee59',
        fullName: 'name lastName',
        email: 'email@email.com',
        password: 'Ensayo118',
        role: 'role',
        branchId: 'fc5558be-96a9-4e8b-8d4d-42fd0a5e618f',
      },
      occurredOn: new Date(),
      typeName: TypeNamesEnum.RegisteredUser,
      aggregateRootId: '1de46802-b4bc-4035-851c-671ebd2f4d5a',
    };
    const user = {
      id: 'fcd445c4-2050-4b19-a870-3432eeac1da7',
      fullName: 'name lastName',
      branchId: 'fc5558be-96a9-4e8b-8d4d-42fd0a5e618f',
      email: 'email@email.com',
      password: 'Ensayo118',
      role: 'role',
    };
    jest.spyOn(registerUserUseCase, 'execute').mockReturnValueOnce(of(user));

    // Act
    const result = querieSubscriber.registerUser(event);

    // Assert
    result.subscribe((user) => {
      expect(user).toEqual(user);
    });
  });

  it('poder crear una sucursal', () => {
    // Arrange
    const event = {
      eventBody: {
        id: '1',
        name: 'name',
        location: 'location',
        products: [],
        sales: [],
        users: [],
      },
      occurredOn: new Date(),
      typeName: TypeNamesEnum.RegisteredBranch,
      aggregateRootId: '1de46802-b4bc-4035-851c-671ebd2f4d5a',
    };
    const branch = {
      id: '1',
      name: 'name',
      location: 'location',
      products: [],
      sales: [],
      users: [],
    };
    jest
      .spyOn(registerBranchUseCase, 'execute')
      .mockReturnValueOnce(of(branch));

    // Act
    const result = querieSubscriber.registerBranch(event);

    // Assert
    result.subscribe((branch) => {
      expect(branch).toEqual(branch);
    });
  });

  it('poder crear una venta', () => {
    // Arrange
    const event = {
      eventBody: {
        id: '1',
        number: 1,
        date: new Date(),
        branchId: '1',
        products: [
          {
            id: '1',
            name: 'name',
            price: 100,
            quantity: 10,
            category: 'category',
            description: 'description',
            branchId: '1',
          },
        ],
        total: 1000,
        type: SaleEnum.CustomerSale,
      },
      occurredOn: new Date(),
      typeName: TypeNamesEnum.RegisteredSale,
      aggregateRootId: '1de46802-b4bc-4035-851c-671ebd2f4d5a',
    };
    const sale = {
      id: '1',
      number: 1,
      date: new Date(),
      branchId: '1',
      total: 1000,
      type: SaleEnum.CustomerSale,
      products: [
        {
          id: '1',
          name: 'name',
          price: 100,
          quantity: 10,
          category: 'category',
          description: 'description',
          branchId: '1',
        },
      ],
    };
    jest.spyOn(registerSaleUseCase, 'execute').mockReturnValueOnce(of(sale));

    // Act
    const result = querieSubscriber.registerSale(event);

    // Assert
    result.subscribe((sale) => {
      expect(sale).toEqual(sale);
    });
  });
});
