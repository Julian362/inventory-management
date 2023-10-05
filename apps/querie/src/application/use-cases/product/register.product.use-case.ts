import { IProductCommand } from '@domain/command';
import { ProductDomainEntity } from '@domain/entities';
import { IProductDomainService } from '@domain/services';
import {
  ProductCategoryValueObject,
  ProductDescriptionValueObject,
  ProductIdValueObject,
  ProductNameValueObject,
  ProductPriceValueObject,
  ProductQuantityValueObject,
} from '@domain/value-objects';

export class RegisterProductUseCase {
  constructor(private readonly productService: IProductDomainService) {}
  execute(product: IProductCommand) {
    const data: ProductDomainEntity = {
      id: product.id,
      name: new ProductNameValueObject(product.name).valueOf(),
      category: new ProductCategoryValueObject(product.category).valueOf(),
      price: new ProductPriceValueObject(product.price).valueOf(),
      description: new ProductDescriptionValueObject(
        product.description,
      ).valueOf(),
      quantity: new ProductQuantityValueObject(product.quantity).valueOf(),
      branchId: new ProductIdValueObject(product.branchId).valueOf(),
    };
    return this.productService.createProduct(data);
  }
}
