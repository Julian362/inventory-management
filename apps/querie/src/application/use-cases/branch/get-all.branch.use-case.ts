import { BranchDomainEntity } from '@domain/entities';
import { IBranchDomainService } from '@domain/services';
import { map } from 'rxjs';

export class GetAllBranchUseCase {
  constructor(private readonly branchService: IBranchDomainService) {}
  execute() {
    return this.branchService.getAllBranches().pipe(
      map((branch: BranchDomainEntity[]) => {
        return branch;
      }),
    );
  }
}
