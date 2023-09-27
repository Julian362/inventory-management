import { BranchDomainEntity } from '@domain/entities/branch.domain-entity';
import { IBranchDomainService } from '@domain/services';
import { BranchNameValueObject } from '@domain/value-objects';
import { map } from 'rxjs';
import { IUseCase } from '../../interface/use-case.interface';

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
