import { IRegisteredProductQuantityEventPublisher } from '@domain/event/publishers/registeredProductQuantity.event-publisher';
import { IProductDomainService } from '@domain/services';
import { IEventService } from '@domain/services/event.service';
import {
  ProductIdValueObject,
  ProductQuantityValueObject,
} from '@domain/value-objects';
import { map, switchMap } from 'rxjs';
import { IUseCase } from '../../interface/use-case.interface';
export class ModifyQuantityProductUseCase implements IUseCase {
  constructor(
    private readonly productService: IProductDomainService,
    private readonly eventService: IEventService,
  ) {}

  execute(
    id: string,
    quantity: number,
    publisher: IRegisteredProductQuantityEventPublisher,
  ) {
    const data = {
      id: new ProductIdValueObject(id),
      quantity: new ProductQuantityValueObject(quantity),
    };
    return this.productService.getProductById(data.id.valueOf()).pipe(
      map((product) => {
        product.quantity = product.quantity.valueOf() + data.quantity.valueOf();
        return product;
      }),
      switchMap((product) =>
        this.productService
          .modifyQuantity(data.id.valueOf(), product.quantity.valueOf())
          .pipe(
            map(() => {
              publisher.emitCreate(
                this.eventService,
                product.id.valueOf(),
                product.quantity.valueOf(),
              );
              return product;
            }),
          ),
      ),
    );
  }
}
