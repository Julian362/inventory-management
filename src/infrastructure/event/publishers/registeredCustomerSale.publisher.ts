import { IRegisteredCustomerEventPublisher } from '@domain/event/publishers/registeredCustomerSale.event-publisher';
import { IEventModel } from '@domain/utils/models/interfaces/event.interface';
import { Observable, from } from 'rxjs';
import { EventService } from 'src/infrastructure/services/event.service';
import { EventModel } from 'src/infrastructure/utils/models/event.model';

export class RegisteredCustomerSaleEventPublisher
  implements IRegisteredCustomerEventPublisher
{
  emitCreate(
    service: EventService,
    id: string,
    quantity: number,
  ): Observable<IEventModel> {
    const event = new EventModel();
    event.aggregateRootId = id;
    event.occurredOn = new Date();
    event.typeName = 'product.registered.customerSale';
    event.eventBody = JSON.stringify({
      quantity,
      id,
    });
    return from(service.create(event));
  }

  emitGet(service: EventService, id: string): Observable<IEventModel> {
    return from(service.findById(id));
  }
}
