import { ProductDomainEntity } from '@domain/entities';
import { IProductDomainService } from '@domain/services';
import {
  ProductIdValueObject,
  ProductQuantityValueObject,
} from '@domain/value-objects';
import { BadRequestException } from '@nestjs/common';
import { iif, switchMap, throwError } from 'rxjs';

export class RegisterCustomerSaleUseCase {
  constructor(private readonly productService: IProductDomainService) {}

  execute(id: string, quantity: number) {
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
            () =>
              new BadRequestException(
                'producto sin cantidad necesaria para la venta',
              ),
          ),
          this.productService.modifyQuantity(
            data.id.valueOf(),
            product.quantity.valueOf(),
          ),
        );
      }),
    );
  }
}
