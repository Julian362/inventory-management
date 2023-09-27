import { IRegisteredProductQuantityEventPublisher } from '@domain/event/publishers/registeredProductQuantity.event-publisher';
import { IEventService } from '@domain/services/event.service';
import { IEventModel } from '@domain/utils/models/interfaces/event.interface';
import { Observable, from } from 'rxjs';
import { EventModel } from 'src/infrastructure/utils/models/event.model';

export class RegisteredProductQuantityEventPublisher
  implements IRegisteredProductQuantityEventPublisher
{
  emitCreate(
    service: IEventService,
    id: string,
    quantity: number,
  ): Observable<IEventModel> {
    const event = new EventModel();
    event.aggregateRootId = id;
    event.occurredOn = new Date();
    event.typeName = 'productQuantity.registered';
    event.eventBody = JSON.stringify({
      quantity,
      id,
    });
    return from(service.create(event));
  }

  emitGet(service: IEventService, id: string): Observable<IEventModel> {
    return from(service.findById(id));
  }
}
