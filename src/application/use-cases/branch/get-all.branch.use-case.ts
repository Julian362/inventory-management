import { BranchDomainEntity } from '@domain/entities/branch.domain-entity';
import { IBranchDomainService } from '@domain/services';
import { map } from 'rxjs';
import { IUseCase } from '../../interface/use-case.interface';

export class GetAllBranchUseCase implements IUseCase {
  constructor(private readonly branchService: IBranchDomainService) {}
  execute() {
    return this.branchService.getAllBranches().pipe(
      map((branch: BranchDomainEntity[]) => {
        return branch;
      }),
    );
  }
}
