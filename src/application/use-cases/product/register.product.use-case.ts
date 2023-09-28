import { IProductCommand } from '@domain/command';
import { ProductDomainEntity } from '@domain/entities';
import { IRegisteredProductEventPublisher } from '@domain/event/publishers/registeredProduct.event-publisher';
import { IProductDomainService } from '@domain/services';
import { IEventService } from '@domain/services/event.service';
import {
  ProductCategoryValueObject,
  ProductDescriptionValueObject,
  ProductIdValueObject,
  ProductNameValueObject,
  ProductPriceValueObject,
  ProductQuantityValueObject,
} from '@domain/value-objects';
import { map } from 'rxjs';
import { IUseCase } from '../../interface/use-case.interface';

export class RegisterProductUseCase implements IUseCase {
  constructor(
    private readonly productService: IProductDomainService,
    private readonly eventService: IEventService,
  ) {}
  execute(
    product: IProductCommand,
    publisher: IRegisteredProductEventPublisher,
  ) {
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
    return this.productService.createProduct(data).pipe(
      map((product: ProductDomainEntity) => {
        publisher.emitCreate(this.eventService, product);
        return product;
      }),
    );
  }
}
