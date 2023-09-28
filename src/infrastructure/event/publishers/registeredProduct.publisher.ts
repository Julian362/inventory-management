import { IRegisteredProductEventPublisher } from '@domain/event/publishers';
import { IEventService } from '@domain/services';
import { IEventModel } from '@domain/utils/models/interfaces';
import { ProductEntity } from '@infrastructure/entities';
import { EventModel } from '@infrastructure/utils/models';
import { Observable, from } from 'rxjs';

export class RegisteredProductEventPublisher
  implements IRegisteredProductEventPublisher
{
  emitCreate(
    service: IEventService,
    data: ProductEntity,
  ): Observable<IEventModel> {
    const event = new EventModel();
    event.aggregateRootId = data.branchId.valueOf();
    event.occurredOn = new Date();
    event.typeName = 'product.registered';
    event.eventBody = JSON.stringify({
      ...data,
    });
    return from(service.create(event));
  }

  emitGet(service: IEventService, id: string): Observable<IEventModel> {
    return from(service.findById(id));
  }
}
