import {
  EmailSendUseCase,
  ModifyQuantityProductUseCase,
  RegisterBranchUseCase,
  RegisterProductUseCase,
  RegisterSaleUseCase,
  RegisterUserUseCase,
} from '@applications-command/use-cases';
import { ProductDomainEntity } from '@domain/entities';
import { ProductCategory } from '@enums';
import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import { CommandController } from '../command.controller';

describe('CommandController', () => {
  let controller: CommandController;
  let registerProductUseCase: RegisterProductUseCase;
  let saleUseCase: RegisterSaleUseCase;
  let purchaseUseCase: ModifyQuantityProductUseCase;
  let registerUserUseCase: RegisterUserUseCase;
  let registerBranchUseCase: RegisterBranchUseCase;
  let emailSendUseCase: EmailSendUseCase;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CommandController],
      providers: [
        {
          provide: RegisterProductUseCase,
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
        {
          provide: ModifyQuantityProductUseCase,
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
          provide: EmailSendUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();
    controller = app.get<CommandController>(CommandController);
    registerProductUseCase = app.get<RegisterProductUseCase>(
      RegisterProductUseCase,
    );
    saleUseCase = app.get<RegisterSaleUseCase>(RegisterSaleUseCase);
    purchaseUseCase = app.get<ModifyQuantityProductUseCase>(
      ModifyQuantityProductUseCase,
    );
    registerUserUseCase = app.get<RegisterUserUseCase>(RegisterUserUseCase);
    registerBranchUseCase = app.get<RegisterBranchUseCase>(
      RegisterBranchUseCase,
    );
    emailSendUseCase = app.get<EmailSendUseCase>(EmailSendUseCase);
  });

  it('registrar producto', () => {
    // Arrange
    const data: ProductDomainEntity = {
      name: 'martillo',
      category: ProductCategory.ConstructionHardware,
      description: 'martillo de 1kg',
      branchId: '8894b622-df11-4fb1-8507-53b7940d339b',
      price: 1000,
      quantity: 10,
    };
    jest.spyOn(registerProductUseCase, 'execute').mockReturnValue(
      of({
        id: '1',
        ...data,
      } as any),
    );

    // Act and Assert
    controller.toCreateProduct(data).subscribe((result) => {
      expect(result).toEqual({ ...data, id: '1' });
    });
  });

  it('actualizar cantidad de producto', () => {
    // Arrange
    const data = {
      quantity: 10,
    };
    jest.spyOn(purchaseUseCase, 'execute').mockReturnValue(
      of({
        id: '1',
        ...data,
      } as any),
    );

    // Act and Assert
    controller.toUpdateQuantity('1', data).subscribe((result) => {
      expect(result).toEqual({ ...data, id: '1' });
    });
  });

  it('vender producto a vendedor', () => {
    // Arrange
    const data = {
      branchId: '8894b622-df11-4fb1-8507-53b7940d339b',
      email: 'email@email.com',
      products: [
        {
          id: '1',
          quantity: 10,
        },
      ],
    };
    jest.spyOn(saleUseCase, 'execute').mockReturnValue(
      of({
        id: '1',
        ...data,
      } as any),
    );
    jest.spyOn(emailSendUseCase, 'execute').mockReturnValue(of(null));

    // Act and Assert
    controller.toSellerSale(data).subscribe((result) => {
      expect(result).toEqual({ ...data, id: '1' });
    });
  });

  it('vender producto a cliente', () => {
    // Arrange
    const data = {
      branchId: '8894b622-df11-4fb1-8507-53b7940d339b',
      email: 'email@emial.com',
      products: [
        {
          id: '1',
          quantity: 10,
        },
      ],
    };
    jest.spyOn(saleUseCase, 'execute').mockReturnValue(
      of({
        id: '1',
        ...data,
      } as any),
    );
    jest.spyOn(emailSendUseCase, 'execute').mockReturnValue(of(null));

    // Act and Assert
    controller.toCustomerSale(data).subscribe((result) => {
      expect(result).toEqual({ ...data, id: '1' });
    });
  });

  it('registrar sucursal', () => {
    // Arrange
    const data = {
      name: 'sucursal',
      location: {
        city: 'ciudad',
        country: 'pais',
      },
    };
    jest.spyOn(registerBranchUseCase, 'execute').mockReturnValue(
      of({
        id: '1',
        ...data,
      } as any),
    );

    // Act and Assert
    controller.registerBranch(data).subscribe((result) => {
      expect(result).toEqual({ ...data, id: '1' });
    });
  });

  it('registrar usuario', () => {
    // Arrange
    const data = {
      fullName: {
        firstName: 'nombre',
        lastName: 'apellido',
      },
      password: 'password',
      email: 'email@emial.com',
      role: 'admin',
      branchId: '8894b622-df11-4fb1-8507-53b7940d339b',
    };
    jest.spyOn(registerUserUseCase, 'execute').mockReturnValue(
      of({
        id: '1',
        ...data,
      } as any),
    );

    // Act and Assert
    controller.registerUser(data).subscribe((result) => {
      expect(result).toEqual({ ...data, id: '1' });
    });
  });
});
