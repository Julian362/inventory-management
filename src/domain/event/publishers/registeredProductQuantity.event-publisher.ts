import { IEventService } from '@domain/services';
import { IEventModel } from '@domain/utils/models/interfaces';
import { Observable } from 'rxjs';
import { IBaseDomainEventPublisher } from './interface';

export interface IRegisteredProductQuantityEventPublisher
  extends IBaseDomainEventPublisher {
  emitCreate(
    service: IEventService,
    id: string,
    quantity: number,
  ): Observable<IEventModel>;
  emitGet(service: IEventService, id: string): Observable<IEventModel>;
}
