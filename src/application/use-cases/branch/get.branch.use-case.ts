import { IUseCase } from '@applications/interface';
import { BranchDomainEntity } from '@domain/entities';
import { IBranchDomainService } from '@domain/services';
import { BranchNameValueObject } from '@domain/value-objects';
import { map } from 'rxjs';

export class GetBranchUseCase implements IUseCase {
  constructor(private readonly branchService: IBranchDomainService) {}
  execute(id: string) {
    const data = {
      id: new BranchNameValueObject(id),
    };
    return this.branchService.getBranchById(data.id.valueOf()).pipe(
      map((branch: BranchDomainEntity) => {
        return branch;
      }),
    );
  }
}
