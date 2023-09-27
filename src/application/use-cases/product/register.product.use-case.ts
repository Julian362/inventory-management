import { IProductDTO } from '@domain/dto';
import { ProductDomainEntity } from '@domain/entities';
import { IRegisteredProductEventPublisher } from '@domain/event/publishers/registeredProduct.event-publisher';
import { IProductDomainService } from '@domain/services';
import { IEventService } from '@domain/services/event.service';
import {
  ProductCategoryValueObject,
  ProductDescriptionValueObject,
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
  execute(product: IProductDTO, publisher: IRegisteredProductEventPublisher) {
    const data: ProductDomainEntity = {
      name: new ProductNameValueObject(product.name),
      category: new ProductCategoryValueObject(product.category),
      price: new ProductPriceValueObject(product.price),
      description: new ProductDescriptionValueObject(product.description),
      quantity: new ProductQuantityValueObject(product.quantity),
    };
    return this.productService.createProduct(data).pipe(
      map((product: ProductDomainEntity) => {
        publisher.emitCreate(this.eventService, product);
        return product;
      }),
    );
  }
}
