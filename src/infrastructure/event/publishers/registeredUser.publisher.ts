import { IRegisteredUserEventPublisher } from '@domain/event/publishers';
import { IEventModel } from '@domain/utils/models/interfaces';
import { UserEntity } from '@infrastructure/entities';
import { EventService } from '@infrastructure/services';
import { EventModel } from '@infrastructure/utils/models';
import { Observable, from } from 'rxjs';

export class RegisteredUserEventPublisher
  implements IRegisteredUserEventPublisher
{
  emitCreate(service: EventService, data: UserEntity): Observable<IEventModel> {
    const event = new EventModel();
    event.aggregateRootId = data.branchId.valueOf();
    event.occurredOn = new Date();
    event.typeName = 'user.registered';
    event.eventBody = JSON.stringify({
      ...data,
    });
    return from(service.create(event));
  }

  emitGet(service: EventService, id: string): Observable<IEventModel> {
    return from(service.findById(id));
  }
}
