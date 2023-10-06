import { IProductDomainService } from '@domain/services';
import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ProductPostgresEntity } from '../entities';
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
  getAllProducts(id: string): Observable<ProductPostgresEntity[]> {
    return this.productRepository.findAll(id);
  }
  modifyQuantity(
    id: string,
    quantity: number,
  ): Observable<ProductPostgresEntity> {
    return this.productRepository.update(id, quantity);
  }
}
