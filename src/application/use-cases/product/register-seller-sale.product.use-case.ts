import { ProductDomainEntity } from '@domain/entities';
import { IRegisteredSellerEventPublisher } from '@domain/event/publishers';
import { IEventService, IProductDomainService } from '@domain/services';
import {
  ProductIdValueObject,
  ProductQuantityValueObject,
} from '@domain/value-objects';
import { iif, switchMap, throwError } from 'rxjs';

export class RegisterSellerSaleUseCase {
  constructor(
    private readonly productService: IProductDomainService,
    private readonly eventService: IEventService,
  ) {}

  execute(
    id: string,
    quantity: number,
    publisher: IRegisteredSellerEventPublisher,
  ) {
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
            () => new Error('producto sin cantidad necesaria para la venta'),
          ),
          this.productService
            .modifyQuantity(data.id.valueOf(), product.quantity.valueOf())
            .pipe(
              switchMap(() => {
                publisher.emitCreate(
                  this.eventService,
                  data.id.valueOf(),
                  data.quantity.valueOf(),
                );
                return this.productService.getProductById(data.id.valueOf());
              }),
            ),
        );
      }),
    );
  }
}
