import { IProductDomainEntity, ProductDomainEntity } from '@domain/entities';
import { EventPublisher, IStoreEvent } from '@domain/event';
import { IProductDomainService } from '@domain/services';
import {
  ProductIdValueObject,
  ProductQuantityValueObject,
} from '@domain/value-objects';
import { InventoryEventPublisherEnum } from '@enums';
import { Observable, map, switchMap, tap } from 'rxjs';
export class ModifyQuantityProductUseCase {
  constructor(
    private readonly productService: IProductDomainService,
    private readonly eventStore: IStoreEvent,
    private readonly publisher: EventPublisher,
  ) {}

  execute(id: string, quantity: number): Observable<IProductDomainEntity> {
    const data = {
      id: new ProductIdValueObject(id),
      quantity: new ProductQuantityValueObject(quantity),
    };
    return this.productService.getProductById(data.id.valueOf()).pipe(
      switchMap((product: ProductDomainEntity) => {
        product.quantity = product.quantity.valueOf() + data.quantity.valueOf();
        return this.productService
          .modifyQuantity(data.id.valueOf(), product.quantity.valueOf())
          .pipe(
            switchMap(() => {
              return this.eventStore
                .emitCreate(
                  product,
                  InventoryEventPublisherEnum.registeredBranch,
                )
                .pipe(
                  tap((event) => {
                    this.publisher.response = event;
                    this.publisher.typeName =
                      InventoryEventPublisherEnum.registeredBranch;
                    this.publisher.publish();
                  }),
                  map(() => product),
                );
            }),
            map(() => product),
          );
      }),
    );
  }
}
