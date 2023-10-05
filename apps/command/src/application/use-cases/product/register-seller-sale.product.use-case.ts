import { EventPublisher } from '@domain-command/event';
import { IEventService } from '@domain-command/services';
import { IEventModel } from '@domain-command/utils/models/interfaces';
import { ProductDomainEntity } from '@domain/entities';
import {
  ProductIdValueObject,
  ProductQuantityValueObject,
} from '@domain/value-objects';
import { TypeNamesEnum } from '@enums';
import { BadRequestException } from '@nestjs/common';
import { Observable, iif, map, switchMap, tap, throwError } from 'rxjs';

export class RegisterSellerSaleUseCase {
  constructor(
    private readonly eventService: IEventService,
    private readonly publisher: EventPublisher,
  ) {}

  execute(id: string, quantity: number): Observable<ProductDomainEntity> {
    const data = {
      id: new ProductIdValueObject(id),
      quantity: new ProductQuantityValueObject(quantity),
    };
    return this.eventService
      .findByEntityId(data.id.valueOf(), [
        TypeNamesEnum.RegisteredCustomerSale,
        TypeNamesEnum.RegisteredSellerSale,
        TypeNamesEnum.RegisteredProduct,
        TypeNamesEnum.RegisteredProductQuantity,
      ])
      .pipe(
        switchMap((event: IEventModel) => {
          const product = event.eventBody as ProductDomainEntity;
          product.quantity =
            product.quantity.valueOf() - data.quantity.valueOf();
          return iif(
            () => product.quantity.valueOf() < 0,
            throwError(
              () =>
                new BadRequestException(
                  'producto sin cantidad necesaria para la venta',
                ),
            ),
            this.eventService
              .create(product, TypeNamesEnum.RegisteredSellerSale)
              .pipe(
                tap((event) => {
                  this.publisher.response = event;
                  this.publisher.typeName = TypeNamesEnum.RegisteredSellerSale;
                  this.publisher.publish();
                }),
                map(() => product),
              ),
          );
        }),
      );
  }
}
