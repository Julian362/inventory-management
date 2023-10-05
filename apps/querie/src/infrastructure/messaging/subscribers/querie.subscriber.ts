import {
  RegisterBranchUseCase,
  RegisterProductUseCase,
  RegisterUserUseCase,
  UpdateQuantityProductUseCase,
} from '@applications-querie-/use-cases';
import { IEventModel } from '@domain-command/utils/models/interfaces';
import {
  BranchDomainEntity,
  ProductDomainEntity,
  UserDomainEntity,
} from '@domain/entities';
import { TypeNamesEnum } from '@enums';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import {
  BranchCommandQuerie,
  ProductCommand,
  UserCommand,
} from '@infrastructure-querie/command';
import { Controller } from '@nestjs/common';
import { LocationType } from '@types';
import { Observable } from 'rxjs';

@Controller()
export class QuerieSubscriber {
  constructor(
    private readonly registerUseCase: RegisterProductUseCase,
    private readonly updateUseCase: UpdateQuantityProductUseCase,
    private readonly registerUserUseCase: RegisterUserUseCase,
    private readonly registerBranchUseCase: RegisterBranchUseCase,
  ) {}

  //Product

  @RabbitSubscribe({
    exchange: 'inventory_exchange',
    routingKey: TypeNamesEnum.RegisteredProduct,
    queue: 'product_queue',
  })
  toCreateProduct(data: object): Observable<ProductDomainEntity> {
    const event: IEventModel = data as IEventModel;
    const product: ProductCommand = event.eventBody as ProductCommand;
    console.log('creando producto');
    return this.registerUseCase.execute({
      id: product.id.valueOf(),
      name: product.name.valueOf(),
      price: product.price.valueOf(),
      quantity: product.quantity.valueOf(),
      category: product.category.valueOf(),
      description: product.description.valueOf(),
      branchId: product.branchId.valueOf(),
    });
  }

  @RabbitSubscribe({
    exchange: 'inventory_exchange',
    routingKey: 'registered.product.quantity.#',
    queue: 'product_queue',
  })
  toUpdateQuantity(data: object): Observable<ProductDomainEntity> {
    const event: IEventModel = data as IEventModel;
    const product: ProductDomainEntity = event.eventBody as ProductDomainEntity;
    return this.updateUseCase.execute(
      product.id.valueOf(),
      product.quantity.valueOf(),
    );
  }

  //Branch

  @RabbitSubscribe({
    exchange: 'inventory_exchange',
    routingKey: TypeNamesEnum.registeredBranch,
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

  @RabbitSubscribe({
    exchange: 'inventory_exchange',
    routingKey: TypeNamesEnum.RegisteredUser,
    queue: 'user_queue',
  })
  registerUser(data: object): Observable<UserDomainEntity> {
    console.log('creando usuario');
    const event: IEventModel = data as IEventModel;
    const user: UserCommand = event.eventBody as unknown as UserCommand;
    return this.registerUserUseCase.execute({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
      branchId: user.branchId,
    });
  }
}
