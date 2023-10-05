import { SaleDomainEntity } from '@domain/entities/sale.domain-entity';
import { ISaleDomainService } from '@domain/services/sale.service';
import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { SalePostgresEntity } from '../entities';
import { SaleRepository } from '../repositories';

@Injectable()
export class SalePostgresService implements ISaleDomainService {
  constructor(private readonly saleRepository: SaleRepository) {}
  createSale(sale: SalePostgresEntity): Observable<SaleDomainEntity> {
    return this.saleRepository.create(sale);
  }
  getSaleById(id: string): Observable<SaleDomainEntity> {
    return this.saleRepository.findById(id);
  }

  getAllSale(): Observable<SaleDomainEntity[]> {
    return this.saleRepository.findAll();
  }
}
