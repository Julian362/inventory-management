import {
  GetAllBranchUseCase,
  GetAllProductUseCase,
  GetAllSaleUseCase,
  GetAllUserUseCase,
  GetBranchUseCase,
  GetProductUseCase,
  GetUserUseCase,
} from '@applications-querie-/use-cases';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test } from '@nestjs/testing';
import { of } from 'rxjs';
import { QuerieController } from '../querie.controller';

describe('QuerieController', () => {
  let controller: QuerieController;
  let getUserUseCase: GetUserUseCase;
  let getAllUserUseCase: GetAllUserUseCase;
  let getProductUseCase: GetProductUseCase;
  let getAllProductUseCase: GetAllProductUseCase;
  let getBranchUseCase: GetBranchUseCase;
  let getAllBranchUseCase: GetAllBranchUseCase;
  let getAllSaleUseCase: GetAllSaleUseCase;

  beforeEach(async () => {
    const app = await Test.createTestingModule({
      imports: [
        PassportModule.register({ defaultStrategy: 'jwt', session: false }),
        JwtModule.register({
          secretOrPrivateKey: 'secretKey',
          signOptions: {
            expiresIn: 3600,
          },
        }),
      ],
      controllers: [QuerieController],
      providers: [
        {
          provide: GetUserUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: GetAllUserUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: GetProductUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: GetAllProductUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: GetBranchUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: GetAllBranchUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: GetAllSaleUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = app.get<QuerieController>(QuerieController);
    getUserUseCase = app.get<GetUserUseCase>(GetUserUseCase);
    getAllUserUseCase = app.get<GetAllUserUseCase>(GetAllUserUseCase);
    getProductUseCase = app.get<GetProductUseCase>(GetProductUseCase);
    getAllProductUseCase = app.get<GetAllProductUseCase>(GetAllProductUseCase);
    getBranchUseCase = app.get<GetBranchUseCase>(GetBranchUseCase);
    getAllBranchUseCase = app.get<GetAllBranchUseCase>(GetAllBranchUseCase);
    getAllSaleUseCase = app.get<GetAllSaleUseCase>(GetAllSaleUseCase);
  });
  it('obtener el usuario por id', () => {
    // Arrange
    const id = '1';
    const user = {
      id: '1',
      name: 'name',
      lastname: 'lastname',
      email: 'email',
      password: 'password',
      role: 'role',
    };
    jest.spyOn(getUserUseCase, 'execute').mockReturnValueOnce(of(user as any));

    // Act and Assert
    controller.toGetUser(id).subscribe((result) => {
      expect(result).toEqual(user);
    });
  });

  it('obtener todos los usuarios', () => {
    // Arrange
    const users = [
      {
        id: '1',
        name: 'name',
        lastname: 'lastname',
        email: 'email',
        password: 'password',
        role: 'role',
      },
    ];
    jest
      .spyOn(getAllUserUseCase, 'execute')
      .mockReturnValueOnce(of(users as any[]));

    // Act and Assert
    controller.toGetAllUser().subscribe((result) => {
      expect(result).toEqual(users);
    });
  });

  it('obtener el producto por id', () => {
    // Arrange
    const id = '1';
    const product = {
      id: '1',
      name: 'name',
      description: 'description',
      price: 1,
      stock: 1,
    };
    jest
      .spyOn(getProductUseCase, 'execute')
      .mockReturnValueOnce(of(product as any));

    // Act and Assert
    controller.toGetProduct(id).subscribe((result) => {
      expect(result).toEqual(product);
    });
  });

  it('obtener todos los productos', () => {
    // Arrange
    const products = [
      {
        id: '1',
        name: 'name',
        description: 'description',
        price: 1,
        stock: 1,
      },
    ];
    jest
      .spyOn(getAllProductUseCase, 'execute')
      .mockReturnValueOnce(of(products as any));

    // Act and Assert
    controller
      .toGetAllProduct('8894b622-df11-4fb1-8507-53b7940d339b')
      .subscribe((result) => {
        expect(result).toEqual(products);
      });
  });

  it('obtener la sucursal por id', () => {
    // Arrange
    const id = '1';
    const branch = {
      id: '1',
      name: 'name',
      address: 'address',
    };
    jest
      .spyOn(getBranchUseCase, 'execute')
      .mockReturnValueOnce(of(branch as any));

    // Act and Assert
    controller.toGetBranch(id).subscribe((result) => {
      expect(result).toEqual(branch);
    });
  });

  it('obtener todas las sucursales', () => {
    // Arrange
    const branches = [
      {
        id: '1',
        name: 'name',
        address: 'address',
      },
    ];
    jest
      .spyOn(getAllBranchUseCase, 'execute')
      .mockReturnValueOnce(of(branches as any));

    // Act and Assert
    controller.toGetAllBranch().subscribe((result) => {
      expect(result).toEqual(branches);
    });
  });

  it('obtener todas las ventas', () => {
    // Arrange
    const sales = [
      {
        id: '1',
        branchId: '1',
        email: 'email',
        products: [
          {
            id: '1',
            quantity: 1,
          },
        ],
      },
    ];
    jest
      .spyOn(getAllSaleUseCase, 'execute')
      .mockReturnValueOnce(of(sales as any));

    // Act and Assert
    controller
      .toGetAllSale('8894b622-df11-4fb1-8507-53b7940d339b')
      .subscribe((result) => {
        expect(result).toEqual(sales);
      });
  });
});
