import { IRegisteredProductQuantityEventPublisher } from '@domain/event/publishers';
import { IEventService } from '@domain/services';
import { IEventModel } from '@domain/utils/models/interfaces';
import { EventModel } from '@infrastructure/utils/models';
import { Observable, from } from 'rxjs';

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
    event.typeName = 'product.registered.quantity';
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
