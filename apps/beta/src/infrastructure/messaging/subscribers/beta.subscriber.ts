import {
  ModifyQuantityProductUseCase,
  RegisterBranchUseCase,
  RegisterCustomerSaleUseCase,
  RegisterProductUseCase,
  RegisterSellerSaleUseCase,
  RegisterUserUseCase,
} from '@beta-applications/use-cases';
import { ProductCommand, UserCommand } from '@beta-infrastructure/command';
import { IProductCommand, IUserCommand } from '@domain/command';
import {
  BranchDomainEntity,
  ProductDomainEntity,
  UserDomainEntity,
} from '@domain/entities';
import { IEventModel } from '@domain/utils/models/interfaces';
import { InventoryEventPublisherEnum } from '@enums';
import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Controller()
export class BetaSubscriber {
  constructor(
    private readonly registerUseCase: RegisterProductUseCase,
    private readonly sellerSaleUseCase: RegisterSellerSaleUseCase,
    private readonly customerSaleUseCase: RegisterCustomerSaleUseCase,
    private readonly purchaseUseCase: ModifyQuantityProductUseCase,
    private readonly registerUserUseCase: RegisterUserUseCase,
    private readonly registerBranchUseCase: RegisterBranchUseCase,
  ) {}

  //Product

  @EventPattern(InventoryEventPublisherEnum.RegisteredProduct)
  toCreateProduct(@Payload() data: string): Observable<ProductDomainEntity> {
    const event: IEventModel = JSON.parse(data);
    const product: ProductCommand = JSON.parse(event.eventBody);
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

  // @EventPattern(InventoryEventPublisherEnum.RegisteredProductQuantity)
  // toUpdateQuantity(
  //   @Param('id') id: string,
  //   @Payload() UpdateQuantityCommand,
  // ): Observable<ProductDomainEntity> {
  //   return this.purchaseUseCase.execute(id, quantity.quantity);
  // }

  // @EventPattern(InventoryEventPublisherEnum.RegisteredSellerSale)
  // toSellerSale(
  //   @Param('id') id: string,
  //   @Payload() UpdateQuantityCommand,
  // ): Observable<ProductDomainEntity> {
  //   return this.sellerSaleUseCase.execute(id, quantity.quantity);
  // }

  // @EventPattern(InventoryEventPublisherEnum.RegisteredCustomerSale)
  // toCustomerSale(
  //   @Param('id') id: string,
  //   @Payload() UpdateQuantityCommand,
  // ): Observable<ProductDomainEntity> {
  //   return this.customerSaleUseCase.execute(id, quantity.quantity);
  // }

  //Branch

  @EventPattern(InventoryEventPublisherEnum.registeredBranch)
  registerBranch(@Payload() data: string): Observable<BranchDomainEntity> {
    console.log('creando sucursal');
    const event: IEventModel = JSON.parse(data);
    const branch: {
      id: string;
      name: string;
      location: string;
      product: IProductCommand[];
      user: IUserCommand[];
    } = JSON.parse(event.eventBody);
    return this.registerBranchUseCase.execute({
      id: branch.id,
      name: branch.name,
      location: {
        city: branch.location.split(', ')[0],
        country: branch.location.split(', ')[1],
      },
      product: branch.product,
      user: branch.user,
    });
  }

  //User

  @EventPattern(InventoryEventPublisherEnum.RegisteredUser)
  registerUser(@Payload() data: string): Observable<UserDomainEntity> {
    console.log('creando usuario');
    const event: IEventModel = JSON.parse(data);
    const user: UserCommand = JSON.parse(event.eventBody);
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
