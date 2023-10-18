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

    return this.updateUseCase.execute(product.id, product.quantity);
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
      id: branch.id,
      name: branch.name,
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
      fullName: {
        firstName: user.fullName.split(' ')[0],
        lastName: user.fullName.split(' ')[1],
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
      id: sale.id,
      number: sale.number,
      date: new Date(sale.date),
      branchId: sale.branchId,
      products: sale.products,
      total: sale.total,
      type: sale.type,
    });
  }
}
