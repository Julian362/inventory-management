import { IBranchDTO } from '@domain/dto';
import { BranchDomainEntity } from '@domain/entities/branch.domain-entity';
import { IRegisteredBranchEventPublisher } from '@domain/event/publishers/registeredBranch.event-publisher';
import { IBranchDomainService } from '@domain/services';
import { IEventService } from '@domain/services/event.service';
import {
  BranchLocationValueObject,
  BranchNameValueObject,
} from '@domain/value-objects';
import { map } from 'rxjs';
import { IUseCase } from '../../interface/use-case.interface';

export class RegisterBranchUseCase implements IUseCase {
  constructor(
    private readonly branchService: IBranchDomainService,
    private readonly eventService: IEventService,
  ) {}
  execute(branch: IBranchDTO, publisher: IRegisteredBranchEventPublisher) {
    const data: BranchDomainEntity = {
      name: new BranchNameValueObject(branch.name),
      location: new BranchLocationValueObject(branch.location),
    };
    return this.branchService.createBranch(data).pipe(
      map((branch: BranchDomainEntity) => {
        publisher.emitCreate(this.eventService, branch);
        return branch;
      }),
    );
  }
}
