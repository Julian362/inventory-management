import { BranchDomainEntity } from '@domain/entities';
import { IBranchDomainService } from '@domain/services';
import { BranchIdValueObject } from '@domain/value-objects';
import { map } from 'rxjs';

export class GetBranchUseCase {
  constructor(private readonly branchService: IBranchDomainService) {}
  execute(id: string) {
    const data = {
      id: new BranchIdValueObject(id).valueOf(),
    };
    return this.branchService.getBranchById(data.id).pipe(
      map((branch: BranchDomainEntity) => {
        return branch;
      }),
    );
  }
}
