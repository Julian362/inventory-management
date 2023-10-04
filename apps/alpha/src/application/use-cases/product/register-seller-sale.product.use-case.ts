import { ProductDomainEntity } from '@domain/entities';
import { EventPublisher, IStoreEvent } from '@domain/event';
import { IProductDomainService } from '@domain/services';
import {
  ProductIdValueObject,
  ProductQuantityValueObject,
} from '@domain/value-objects';
import { InventoryEventPublisherEnum } from '@enums';
import { BadRequestException } from '@nestjs/common';
import { iif, map, mergeMap, switchMap, tap, throwError } from 'rxjs';

export class RegisterSellerSaleUseCase {
  constructor(
    private readonly productService: IProductDomainService,
    private readonly eventStore: IStoreEvent,
    private readonly publisher: EventPublisher,
  ) {}

  execute(id: string, quantity: number) {
    const data = {
      id: new ProductIdValueObject(id),
      quantity: new ProductQuantityValueObject(quantity),
    };
    return this.productService.getProductById(data.id.valueOf()).pipe(
      switchMap((product: ProductDomainEntity) => {
        product.quantity = product.quantity.valueOf() - data.quantity.valueOf();
        return iif(
          () => product.quantity.valueOf() < 0,
          throwError(
            () =>
              new BadRequestException(
                'producto sin cantidad necesaria para la venta',
              ),
          ),
          this.productService
            .modifyQuantity(data.id.valueOf(), product.quantity.valueOf())
            .pipe(
              mergeMap(() => {
                return this.eventStore
                  .emitCreate(
                    product,
                    InventoryEventPublisherEnum.RegisteredSellerSale,
                  )
                  .pipe(
                    tap((event) => {
                      this.publisher.response = event;
                      this.publisher.typeName =
                        InventoryEventPublisherEnum.RegisteredSellerSale;
                      this.publisher.publish();
                    }),
                    map(() => product),
                  );
              }),
            ),
        );
      }),
    );
  }
}
