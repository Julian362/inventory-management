import { IUseCase } from '@applications/interface';
import { ProductDomainEntity } from '@domain/entities';
import { IProductDomainService } from '@domain/services';
import { ProductNameValueObject } from '@domain/value-objects';
import { map } from 'rxjs';

export class GetProductUseCase implements IUseCase {
  constructor(private readonly productService: IProductDomainService) {}
  execute(id: string) {
    const data = {
      id: new ProductNameValueObject(id),
    };
    return this.productService.getProductById(data.id.valueOf()).pipe(
      map((product: ProductDomainEntity) => {
        return product;
      }),
    );
  }
}
