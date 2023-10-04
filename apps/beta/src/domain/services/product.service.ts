import { IProductDomainEntity, ProductDomainEntity } from '@domain/entities';
import { Observable } from 'rxjs';

export interface IProductDomainService {
  createProduct(product: ProductDomainEntity): Observable<IProductDomainEntity>;
  getProductById(id: string): Observable<IProductDomainEntity>;
  getAllProducts(): Observable<IProductDomainEntity[]>;
  modifyQuantity(
    id: string,
    quantity: number,
  ): Observable<IProductDomainEntity>;
}
