import { SaleDomainEntity } from '@domain/entities/sale.domain-entity';
import { Observable } from 'rxjs';

export interface ISaleDomainService {
  createSale(sale: SaleDomainEntity): Observable<SaleDomainEntity>;
  getSaleById(id: string): Observable<SaleDomainEntity>;
  getAllSale(id: string): Observable<SaleDomainEntity[]>;
}
