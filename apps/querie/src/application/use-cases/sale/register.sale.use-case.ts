import { ISaleDomainEntity } from '@domain/entities';
import { IBranchDomainService } from '@domain/services';
import { ISaleDomainService } from '@domain/services/sale.service';
import { Observable, switchMap } from 'rxjs';

export class RegisterSaleUseCase {
  constructor(
    private readonly saleService: ISaleDomainService,
    private readonly branchService: IBranchDomainService,
  ) {}
  execute(sale: ISaleDomainEntity): Observable<ISaleDomainEntity> {
    return this.branchService.getBranchById(sale.branchId.valueOf()).pipe(
      switchMap((branch) => {
        if (branch) {
          return this.saleService.createSale(sale);
        }
        throw new Error('Branch not found');
      }),
    );
  }
}
