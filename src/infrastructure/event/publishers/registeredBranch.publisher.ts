import { BranchDomainEntity } from '@domain/entities/branch.domain-entity';
import { IRegisteredBranchEventPublisher } from '@domain/event/publishers/registeredBranch.event-publisher';
import { IEventService } from '@domain/services/event.service';
import { IEventModel } from '@domain/utils/models/interfaces/event.interface';
import { Injectable } from '@nestjs/common';
import { Observable, from } from 'rxjs';
import { EventService } from 'src/infrastructure/services/event.service';
import { EventModel } from 'src/infrastructure/utils/models/event.model';

@Injectable()
export class RegisteredBranchPublisher
  implements IRegisteredBranchEventPublisher
{
  emitCreate(
    service: EventService,
    data: BranchDomainEntity,
  ): Observable<IEventModel> {
    const event = new EventModel();
    event.aggregateRootId = data.id.valueOf();
    event.occurredOn = new Date();
    event.typeName = 'branch.registered';
    event.eventBody = JSON.stringify({
      ...data,
    });
    return from(service.create(event));
  }

  emitGet(service: IEventService, id: string): Observable<IEventModel> {
    return from(service.findById(id));
  }
}
