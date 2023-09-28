import { IRegisteredProductEventPublisher } from '@domain/event/publishers/registeredProduct.event-publisher';
import { IEventService } from '@domain/services/event.service';
import { IEventModel } from '@domain/utils/models/interfaces/event.interface';
import { Observable, from } from 'rxjs';
import { ProductEntity } from 'src/infrastructure/entities/product.entity';
import { EventModel } from 'src/infrastructure/utils/models/event.model';

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
