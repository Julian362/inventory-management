import { InjectRepository } from '@nestjs/typeorm';
import { Observable, from, switchMap } from 'rxjs';
import { Repository } from 'typeorm';
import { ProductPostgresEntity } from '../entities/product.postgres-entity';
import { IBase } from './interfaces/base.interface';
export class ProductRepository implements IBase<ProductPostgresEntity> {
  constructor(
    @InjectRepository(ProductPostgresEntity)
    private readonly productRepository: Repository<ProductPostgresEntity>,
  ) {}
  create(entity: ProductPostgresEntity): Observable<ProductPostgresEntity> {
    return from(this.productRepository.save(entity));
  }
  findById(id: string): Observable<ProductPostgresEntity> {
    return from(
      this.productRepository.findOne({
        where: { id },
      }),
    );
  }

  update(id: string, quantity: number): Observable<ProductPostgresEntity> {
    return this.findById(id).pipe(
      switchMap((product): Observable<ProductPostgresEntity> => {
        product.quantity = quantity;
        return from(this.productRepository.save(product));
      }),
    );
  }

  findAll(): Observable<ProductPostgresEntity[]> {
    return from(this.productRepository.find());
  }
}
