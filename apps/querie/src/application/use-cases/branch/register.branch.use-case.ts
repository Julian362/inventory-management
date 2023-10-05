import { IBranchCommand } from '@domain/command';
import { BranchDomainEntity } from '@domain/entities';
import { IBranchDomainService } from '@domain/services';
import {
  BranchLocationValueObject,
  BranchNameValueObject,
} from '@domain/value-objects';
import { LocationType } from '@types';
import { Observable } from 'rxjs';

export class RegisterBranchUseCase {
  constructor(private readonly branchService: IBranchDomainService) {}
  execute(branch: IBranchCommand): Observable<BranchDomainEntity> {
    const location = new BranchLocationValueObject({
      city: branch.location.city,
      country: branch.location.country,
    } as LocationType);
    const data: BranchDomainEntity = {
      id: branch.id,
      name: new BranchNameValueObject(branch.name).valueOf(),
      location: location.valueOf().city + ', ' + location.valueOf().country,
      users: [],
      products: [],
    };
    return this.branchService.createBranch(data);
  }
}
