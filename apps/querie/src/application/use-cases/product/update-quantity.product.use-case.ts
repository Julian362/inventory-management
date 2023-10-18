import { ProductDomainEntity } from '@domain/entities';
import { IProductDomainService } from '@domain/services';
import {
  ProductIdValueObject,
  ProductQuantityValueObject,
} from '@domain/value-objects';
import { Observable, switchMap } from 'rxjs';
export class UpdateQuantityProductUseCase {
  constructor(private readonly productService: IProductDomainService) {}

  execute(id: string, quantity: number): Observable<ProductDomainEntity> {
    const data = {
      id: new ProductIdValueObject(id).valueOf(),
      quantity: new ProductQuantityValueObject(quantity).valueOf(),
    };
    return this.productService.getProductById(data.id).pipe(
      switchMap((product: ProductDomainEntity) => {
        product.quantity = quantity;
        return this.productService.modifyQuantity(data.id, product.quantity);
      }),
    );
  }
}
