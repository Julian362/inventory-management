import { IProductDomainEntity, ProductDomainEntity } from '@domain/entities';
import { IProductDomainService } from '@domain/services';
import {
  ProductIdValueObject,
  ProductQuantityValueObject,
} from '@domain/value-objects';
import { Observable, switchMap } from 'rxjs';
export class UpdateQuantityProductUseCase {
  constructor(private readonly productService: IProductDomainService) {}

  execute(id: string, quantity: number): Observable<IProductDomainEntity> {
    const data = {
      id: new ProductIdValueObject(id),
      quantity: new ProductQuantityValueObject(quantity),
    };
    return this.productService.getProductById(data.id.valueOf()).pipe(
      switchMap((product: ProductDomainEntity) => {
        product.quantity = quantity;
        return this.productService.modifyQuantity(
          data.id.valueOf(),
          product.quantity.valueOf(),
        );
      }),
    );
  }
}
