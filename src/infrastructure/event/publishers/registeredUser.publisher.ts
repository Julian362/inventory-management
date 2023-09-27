import { UserDomainEntity } from '@domain/entities/user.domain-entity';
import { IRegisteredUserEventPublisher } from '@domain/event/publishers/registeredUser.event-publisher';
import { IEventModel } from '@domain/utils/models/interfaces/event.interface';
import { Observable, from } from 'rxjs';
import { EventService } from 'src/infrastructure/services/event.service';
import { EventModel } from 'src/infrastructure/utils/models/event.model';

export class RegisteredUserEventPublisher
  implements IRegisteredUserEventPublisher
{
  emitCreate(
    service: EventService,
    data: UserDomainEntity,
  ): Observable<IEventModel> {
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
