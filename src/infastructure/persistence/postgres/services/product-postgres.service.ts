import { IProductDomainService } from '@domain/services';
import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ProductPostgresEntity } from '../entities/product.postgres-entity';
import { ProductRepository } from '../repositories';

@Injectable()
export class ProductPostgresService implements IProductDomainService {
  constructor(private readonly productRepository: ProductRepository) {}
  createProduct(
    product: ProductPostgresEntity,
  ): Observable<ProductPostgresEntity> {
    return this.productRepository.create(product);
  }
  getProductById(id: string): Observable<ProductPostgresEntity> {
    return this.productRepository.findById(id);
  }
  getAllProducts(): Observable<ProductPostgresEntity[]> {
    return this.productRepository.findAll();
  }
  modifyQuantity(
    id: string,
    quantity: number,
  ): Observable<ProductPostgresEntity> {
    console.log(id);
    console.log('ModifyQuantityProductUseCase');
    console.log(quantity);
    return this.productRepository.update(id, quantity);
  }
}
