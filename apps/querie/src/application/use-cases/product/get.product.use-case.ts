import { ProductDomainEntity } from '@domain/entities';
import { IProductDomainService } from '@domain/services';
import { ProductIdValueObject } from '@domain/value-objects';
import { map } from 'rxjs';

export class GetProductUseCase {
  constructor(private readonly productService: IProductDomainService) {}
  execute(id: string) {
    const data = {
      id: new ProductIdValueObject(id).valueOf(),
    };
    return this.productService.getProductById(data.id).pipe(
      map((product: ProductDomainEntity) => {
        return product;
      }),
    );
  }
}
