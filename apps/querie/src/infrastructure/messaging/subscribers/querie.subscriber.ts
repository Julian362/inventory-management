import {
  RegisterBranchUseCase,
  RegisterProductUseCase,
  RegisterSaleUseCase,
  RegisterUserUseCase,
  UpdateQuantityProductUseCase,
} from '@applications-querie-/use-cases';
import { IEventModel } from '@domain-command/utils/models/interfaces';
import {
  BranchDomainEntity,
  ProductDomainEntity,
  UserDomainEntity,
} from '@domain/entities';
import { SaleDomainEntity } from '@domain/entities/sale.domain-entity';
import { TypeNamesEnum } from '@enums';
import { RabbitRPC, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import {
  BranchCommandQuerie,
  ProductCommand,
  UserCommandQuerie,
} from '@infrastructure-querie/command';
import { Controller } from '@nestjs/common';
import { EXCHANGE } from '@shared/const';
import { LocationType } from '@types';
import { Observable } from 'rxjs';

@Controller()
export class QuerieSubscriber {
  constructor(
    private readonly registerUseCase: RegisterProductUseCase,
    private readonly updateUseCase: UpdateQuantityProductUseCase,
    private readonly registerUserUseCase: RegisterUserUseCase,
    private readonly registerBranchUseCase: RegisterBranchUseCase,
    private readonly registerSaleUseCase: RegisterSaleUseCase,
  ) {}

  //Product

  @RabbitRPC({
    exchange: EXCHANGE,
    routingKey: TypeNamesEnum.RegisteredProduct,
    queue: 'product_queue',
  })
  toCreateProduct(data: object): Observable<ProductDomainEntity> {
    const event: IEventModel = data as IEventModel;
    const product: ProductCommand = event.eventBody as ProductCommand;
    console.log('creando producto');
    return this.registerUseCase.execute({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: product.quantity,
      category: product.category,
      description: product.description,
      branchId: product.branchId,
    });
  }

  @RabbitSubscribe({
    exchange: EXCHANGE,
    routingKey: 'registered.product.quantity.#',
    queue: 'product_update_queue',
  })
  toUpdateQuantity(data: object): Observable<ProductDomainEntity> {
    console.log('actualizando cantidad');
    const event: IEventModel = data as IEventModel;
    const product: ProductDomainEntity = event.eventBody as ProductDomainEntity;
    return this.updateUseCase.execute(
      product.id.valueOf(),
      product.quantity.valueOf(),
    );
  }

  //Branch

  @RabbitRPC({
    exchange: EXCHANGE,
    routingKey: TypeNamesEnum.RegisteredBranch,
    queue: 'branch_queue',
  })
  registerBranch(data: object): Observable<BranchDomainEntity> {
    console.log('creando sucursal');
    const event: IEventModel = data as IEventModel;
    const branch: BranchCommandQuerie =
      event.eventBody as unknown as BranchCommandQuerie;
    return this.registerBranchUseCase.execute({
      id: branch.id.valueOf(),
      name: branch.name.valueOf(),
      location: {
        city: branch.location.split(',')[0],
        country: branch.location.split(',')[1],
      } as LocationType,
    });
  }

  //User

  @RabbitRPC({
    exchange: EXCHANGE,
    routingKey: TypeNamesEnum.RegisteredUser,
    queue: 'user_queue',
  })
  registerUser(data: object): Observable<UserDomainEntity> {
    console.log('creando usuario');
    const event: IEventModel = data as IEventModel;
    const user: UserCommandQuerie =
      event.eventBody as unknown as UserCommandQuerie;
    return this.registerUserUseCase.execute({
      id: user.id,
      name: {
        firstName: user.name.split(' ')[0],
        lastName: user.name.split(' ')[1],
      },
      email: user.email,
      password: user.password,
      role: user.role,
      branchId: user.branchId,
    });
  }

  //Sale

  @RabbitSubscribe({
    exchange: EXCHANGE,
    routingKey: TypeNamesEnum.RegisteredSale,
    queue: 'sale_queue',
  })
  registerSale(data: object): Observable<SaleDomainEntity> {
    console.log('creando venta');
    const event: IEventModel = data as IEventModel;
    const sale: SaleDomainEntity = event.eventBody as SaleDomainEntity;
    return this.registerSaleUseCase.execute({
      id: sale.id.valueOf(),
      number: sale.number.valueOf(),
      date: new Date(sale.date.valueOf()),
      branchId: sale.branchId.valueOf(),
      products: sale.products,
      total: sale.total.valueOf(),
    });
  }
}
