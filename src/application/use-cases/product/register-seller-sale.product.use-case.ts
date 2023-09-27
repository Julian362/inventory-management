import { ProductDomainEntity } from '@domain/entities';
import { iif, switchMap, throwError } from 'rxjs';

export class RegisterSellerSaleUseCase {
  constructor(private readonly productService) {}

  execute(id: string, quantity: number) {
    return this.productService.getProductById(id).pipe(
      switchMap((product: ProductDomainEntity) => {
        product.quantity = product.quantity.valueOf() - quantity;
        return iif(
          () => product.quantity.valueOf() < 0,
          throwError(
            () => new Error('producto sin cantidad necesaria para la venta'),
          ),
          this.productService.modifyQuantity(id, product.quantity.valueOf()),
        );
      }),
    );
  }
}
