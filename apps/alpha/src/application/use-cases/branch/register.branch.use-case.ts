import { IBranchCommand } from '@domain/command';
import { BranchDomainEntity } from '@domain/entities';
import { EventPublisher, IStoreEvent } from '@domain/event/publishers';
import {
  BranchLocationValueObject,
  BranchNameValueObject,
} from '@domain/value-objects';
import { InventoryEventPublisherEnum } from '@enums';
import { LocationType } from '@types';
import { Observable, map, tap } from 'rxjs';
import { v4 as uuid } from 'uuid';

export class RegisterBranchUseCase {
  constructor(
    private readonly eventStore: IStoreEvent,
    private readonly publisher: EventPublisher,
  ) {}
  execute(branch: IBranchCommand): Observable<BranchDomainEntity> {
    const location = new BranchLocationValueObject({
      city: branch.location.city,
      country: branch.location.country,
    } as LocationType);
    const data: BranchDomainEntity = {
      name: new BranchNameValueObject(branch.name).valueOf(),
      location: location.valueOf().city + ', ' + location.valueOf().country,
      user: [],
      product: [],
      id: uuid(),
    };
    return this.eventStore
      .emitCreate(data, InventoryEventPublisherEnum.registeredBranch)
      .pipe(
        tap((event) => {
          this.publisher.response = event;
          this.publisher.typeName =
            InventoryEventPublisherEnum.registeredBranch;
          this.publisher.publish();
        }),
        map(() => data),
      );
  }
}
