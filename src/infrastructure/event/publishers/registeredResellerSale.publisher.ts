import { IRegisteredSellerEventPublisher } from '@domain/event/publishers';
import { IEventModel } from '@domain/utils/models/interfaces';
import { EventService } from '@infrastructure/services';
import { EventModel } from '@infrastructure/utils/models';
import { Observable, from } from 'rxjs';

export class RegisteredSellerSaleEventPublisher
  implements IRegisteredSellerEventPublisher
{
  emitCreate(
    service: EventService,
    id: string,
    quantity: number,
  ): Observable<IEventModel> {
    const event = new EventModel();
    event.aggregateRootId = id;
    event.occurredOn = new Date();
    event.typeName = 'product.registered.sellerSale';
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
