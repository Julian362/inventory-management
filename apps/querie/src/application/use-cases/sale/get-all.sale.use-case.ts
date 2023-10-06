import { SaleDomainEntity } from '@domain/entities/sale.domain-entity';
import { ISaleDomainService } from '@domain/services/sale.service';
import { map } from 'rxjs';

export class GetAllSaleUseCase {
  constructor(private readonly saleService: ISaleDomainService) {}
  execute(id: string) {
    return this.saleService.getAllSale(id).pipe(
      map((product: SaleDomainEntity[]) => {
        return product;
      }),
    );
  }
}
