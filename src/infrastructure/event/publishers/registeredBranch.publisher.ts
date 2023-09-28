import { IRegisteredBranchEventPublisher } from '@domain/event/publishers';
import { IEventService } from '@domain/services';
import { IEventModel } from '@domain/utils/models/interfaces';
import { BranchEntity } from '@infrastructure/entities';
import { EventService } from '@infrastructure/services';
import { EventModel } from '@infrastructure/utils/models';
import { Injectable } from '@nestjs/common';
import { Observable, from } from 'rxjs';

@Injectable()
export class RegisteredBranchPublisher
  implements IRegisteredBranchEventPublisher
{
  emitCreate(
    service: EventService,
    data: BranchEntity,
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
