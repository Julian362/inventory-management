import { ProductDomainEntity } from '@domain/entities';
import { IProductDomainService } from '@domain/services';
import { map } from 'rxjs';

export class GetAllProductUseCase {
  constructor(private readonly productService: IProductDomainService) {}
  execute(id: string) {
    return this.productService.getAllProducts(id).pipe(
      map((product: ProductDomainEntity[]) => {
        return product;
      }),
    );
  }
}
