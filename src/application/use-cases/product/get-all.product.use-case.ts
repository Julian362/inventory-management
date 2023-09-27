import { ProductDomainEntity } from '@domain/entities';
import { IProductDomainService } from '@domain/services';
import { map } from 'rxjs';
import { IUseCase } from '../../interface/use-case.interface';

export class GetAllProductUseCase implements IUseCase {
  constructor(private readonly productService: IProductDomainService) {}
  execute() {
    return this.productService.getAllProducts().pipe(
      map((product: ProductDomainEntity[]) => {
        return product;
      }),
    );
  }
}
