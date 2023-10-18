import { ProductDomainEntity } from '@domain/entities';
import { Observable } from 'rxjs';

export interface IProductDomainService {
  createProduct(product: ProductDomainEntity): Observable<ProductDomainEntity>;
  getProductById(id: string): Observable<ProductDomainEntity>;
  getAllProducts(): Observable<ProductDomainEntity[]>;
  modifyQuantity(id: string, quantity: number): Observable<ProductDomainEntity>;
}
