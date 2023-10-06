import { EventPublisher } from '@domain-command/event';
import { IEventService } from '@domain-command/services';
import { IEventModel } from '@domain-command/utils/models/interfaces';
import { IProductDomainEntity } from '@domain/entities';
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

  execute(id: string, quantity: number): Observable<IProductDomainEntity> {
    const data = {
      id: new ProductIdValueObject(id),
      quantity: new ProductQuantityValueObject(quantity),
    };
    return this.eventService
      .findByEntityId(data.id.valueOf(), [
        TypeNamesEnum.RegisteredProduct,
        TypeNamesEnum.RegisteredProductQuantity,
        TypeNamesEnum.RegisteredCustomerSale,
        TypeNamesEnum.RegisteredSellerSale,
      ])
      .pipe(
        switchMap((event: IEventModel) => {
          if (!event) throw new BadRequestException('el producto no existe');
          const product = event.eventBody as IProductDomainEntity;
          product.quantity =
            product.quantity.valueOf() + data.quantity.valueOf();
          return this.eventService
            .create(product, TypeNamesEnum.RegisteredProductQuantity)
            .pipe(
              tap((event) => {
                this.publisher.response = event;
                this.publisher.typeName =
                  TypeNamesEnum.RegisteredProductQuantity;
                console.log('publicando evento');
                this.publisher.publish();
              }),
              map(() => product),
            );
        }),
      );
  }
}
