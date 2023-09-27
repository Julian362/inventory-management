import { IProductDTO } from '@domain/dto';
import { IProductDomainService } from '../../../domain/services/product.service';
import { IUseCase } from '../../interface/use-case.interface';

export class RegisterProductUseCase implements IUseCase {
  constructor(private readonly productService: IProductDomainService) {}
  execute(product: IProductDTO) {
    return this.productService.createProduct(product);
  }
}
