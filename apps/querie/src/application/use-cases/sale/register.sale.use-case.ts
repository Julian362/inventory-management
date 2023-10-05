import { ISalesDomainEntity } from '@domain/entities';
import { IBranchDomainService } from '@domain/services';
import { ISaleDomainService } from '@domain/services/sale.service';
import { map } from 'rxjs';

export class RegisterSaleUseCase {
  constructor(
    private readonly saleService: ISaleDomainService,
    private readonly branchService: IBranchDomainService,
  ) {}
  execute(sale: ISalesDomainEntity) {
    return this.branchService.getBranchById(sale.branchId.valueOf()).pipe(
      map((branch) => {
        if (branch) {
          return this.saleService.createSale(sale);
        }
        throw new Error('Branch not found');
      }),
    );
  }
}
