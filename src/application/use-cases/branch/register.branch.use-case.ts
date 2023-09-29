import { IUseCase } from '@applications/interface';
import { IBranchCommand } from '@domain/command';
import { BranchDomainEntity } from '@domain/entities';
import { IRegisteredBranchEventPublisher } from '@domain/event/publishers';
import { IBranchDomainService, IEventService } from '@domain/services';
import {
  BranchLocationValueObject,
  BranchNameValueObject,
} from '@domain/value-objects';
import { LocationType } from '@types';
import { map } from 'rxjs';

export class RegisterBranchUseCase implements IUseCase {
  constructor(
    private readonly branchService: IBranchDomainService,
    private readonly eventService: IEventService,
  ) {}
  execute(branch: IBranchCommand, publisher: IRegisteredBranchEventPublisher) {
    const location = new BranchLocationValueObject({
      city: branch.location.city,
      country: branch.location.country,
    } as LocationType);
    const data: BranchDomainEntity = {
      name: new BranchNameValueObject(branch.name).valueOf(),
      location: location.valueOf().city + ', ' + location.valueOf().country,
      user: [],
      product: [],
    };
    return this.branchService.createBranch(data).pipe(
      map((branch: BranchDomainEntity) => {
        publisher.emitCreate(this.eventService, branch);
        return branch;
      }),
    );
  }
}
