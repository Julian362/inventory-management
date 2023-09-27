import { IEventService } from '@domain/services/event.service';
import { IEventModel } from '@domain/utils/models/interfaces/event.interface';
import { Observable } from 'rxjs';
import { IBaseDomainEventPublisher } from './interface/base.event-publisher';
export interface IRegisteredCustomerEventPublisher
  extends IBaseDomainEventPublisher {
  emitCreate(
    service: IEventService,
    id: string,
    quantity: number,
  ): Observable<IEventModel>;
  emitGet(service: IEventService, id: string): Observable<IEventModel>;
}
