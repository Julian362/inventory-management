import { IProductDomainService } from '@domain/services';
import { map, switchMap } from 'rxjs';
import { IUseCase } from '../../interface/use-case.interface';
export class ModifyQuantityProductUseCase implements IUseCase {
  constructor(private readonly productService: IProductDomainService) {}

  execute(id: string, quantity: number) {
    return this.productService.getProductById(id).pipe(
      map((product) => {
        console.log(product.quantity.valueOf());
        console.log('===========');
        product.quantity = product.quantity.valueOf() + quantity;
        return product;
      }),
      switchMap((product) =>
        this.productService.modifyQuantity(id, product.quantity.valueOf()),
      ),
    );
  }
}
