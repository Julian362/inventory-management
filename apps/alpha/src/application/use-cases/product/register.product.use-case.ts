import { IProductCommand } from '@domain/command';
import { ProductDomainEntity } from '@domain/entities';
import { EventPublisher, IStoreEvent } from '@domain/event';
import {
  ProductCategoryValueObject,
  ProductDescriptionValueObject,
  ProductIdValueObject,
  ProductNameValueObject,
  ProductPriceValueObject,
  ProductQuantityValueObject,
} from '@domain/value-objects';
import { InventoryEventPublisherEnum } from '@enums';
import { map, tap } from 'rxjs';

export class RegisterProductUseCase {
  constructor(
    private readonly eventStore: IStoreEvent,
    private readonly publisher: EventPublisher,
  ) {}
  execute(product: IProductCommand) {
    const data: ProductDomainEntity = {
      name: new ProductNameValueObject(product.name).valueOf(),
      category: new ProductCategoryValueObject(product.category).valueOf(),
      price: new ProductPriceValueObject(product.price).valueOf(),
      description: new ProductDescriptionValueObject(
        product.description,
      ).valueOf(),
      quantity: new ProductQuantityValueObject(product.quantity).valueOf(),
      branchId: new ProductIdValueObject(product.branchId).valueOf(),
    };
    return this.eventStore
      .emitCreate(data, InventoryEventPublisherEnum.RegisteredProduct)
      .pipe(
        tap((event) => {
          this.publisher.response = event;
          this.publisher.typeName =
            InventoryEventPublisherEnum.RegisteredProduct;
          this.publisher.publish();
        }),
        map(() => product),
      );
  }
}
