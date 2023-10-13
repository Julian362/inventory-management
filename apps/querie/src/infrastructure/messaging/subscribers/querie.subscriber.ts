import {
  RegisterBranchUseCase,
  RegisterProductUseCase,
  RegisterSaleUseCase,
  RegisterUserUseCase,
  UpdateQuantityProductUseCase,
} from '@applications-querie-/use-cases';
import {
  BranchDomainEntity,
  ProductDomainEntity,
  SaleDomainEntity,
  UserDomainEntity,
} from '@domain/entities';
import { IEventModel } from '@domain/utils/models/interfaces';
import { QueueEnum, TypeNamesEnum } from '@enums';
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
    queue: QueueEnum.Product,
  })
  toCreateProduct(event: IEventModel): Observable<ProductDomainEntity> {
    const product: ProductCommand = event.eventBody as ProductCommand;

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
    routingKey: TypeNamesEnum.ChangedProductQuantity,
    queue: QueueEnum.ProductUpdate,
  })
  toUpdateQuantity(event: IEventModel): Observable<ProductDomainEntity> {
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
    queue: QueueEnum.Branch,
  })
  registerBranch(event: IEventModel): Observable<BranchDomainEntity> {
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
    queue: QueueEnum.User,
  })
  registerUser(event: IEventModel): Observable<UserDomainEntity> {
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
    queue: QueueEnum.Sale,
  })
  registerSale(event: IEventModel): Observable<SaleDomainEntity> {
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
