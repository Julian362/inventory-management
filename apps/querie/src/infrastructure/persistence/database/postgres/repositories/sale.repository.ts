import { InjectRepository } from '@nestjs/typeorm';
import { Observable, from } from 'rxjs';
import { Repository } from 'typeorm';
import { SalePostgresEntity } from '../entities';
import { IBase } from './interfaces';

export class SaleRepository implements IBase<SalePostgresEntity> {
  constructor(
    @InjectRepository(SalePostgresEntity)
    private readonly saleRepository: Repository<SalePostgresEntity>,
  ) {
    this.saleRepository = saleRepository;
  }
  create(entity: SalePostgresEntity): Observable<SalePostgresEntity> {
    return from(this.saleRepository.save(entity));
  }
  findById(id: string): Observable<SalePostgresEntity> {
    return from(
      this.saleRepository.findOne({
        where: { id },
      }),
    );
  }
  findAll(id: string): Observable<SalePostgresEntity[]> {
    return from(this.saleRepository.find({ where: { branchId: id } }));
  }
}
