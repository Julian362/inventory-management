import { EventPublisher } from '@domain-command/event';
import { IEventService } from '@domain-command/services';
import { ProductDomainEntity } from '@domain/entities';
import { IEventModel } from '@domain/utils/models/interfaces';
import {
  ProductIdValueObject,
  ProductQuantityValueObject,
} from '@domain/value-objects';
import { TypeNamesEnum } from '@enums';
import { BadRequestException } from '@nestjs/common';
import { Observable, map, switchMap, tap } from 'rxjs';
export class ModifyQuantityProductUseCase {
  constructor(
    private readonly eventService: IEventService,
    private readonly publisher: EventPublisher,
  ) {}

  execute(id: string, quantity: number): Observable<ProductDomainEntity> {
    const data = {
      id: new ProductIdValueObject(id).valueOf(),
      quantity: new ProductQuantityValueObject(quantity).valueOf(),
    };

    return this.eventService
      .findByEntityId(data.id, [
        TypeNamesEnum.RegisteredProduct,
        TypeNamesEnum.RegisteredProductQuantity,
        TypeNamesEnum.RegisteredCustomerSale,
        TypeNamesEnum.RegisteredSellerSale,
      ])
      .pipe(
        switchMap((event: IEventModel) => {
          if (!event) throw new BadRequestException('el producto no existe');
          const product = event.eventBody as ProductDomainEntity;
          product.quantity = product.quantity + data.quantity;
          return this.eventService
            .create(product, TypeNamesEnum.RegisteredProductQuantity)
            .pipe(
              tap((event) => {
                this.publisher.response = event;
                this.publisher.typeName =
                  TypeNamesEnum.RegisteredProductQuantity;
                this.publisher.publish();
              }),
              map(() => product),
            );
        }),
      );
  }
}
