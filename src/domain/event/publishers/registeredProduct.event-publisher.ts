import { ProductDomainEntity } from '@domain/entities';
import { IEventService } from '@domain/services/event.service';
import { IEventModel } from '@domain/utils/models/interfaces/event.interface';
import { Observable } from 'rxjs';
import { IBaseDomainEventPublisher } from './interface/base.event-publisher';

export interface IRegisteredProductEventPublisher
  extends IBaseDomainEventPublisher {
  emitCreate(
    service: IEventService,
    data: ProductDomainEntity,
  ): Observable<IEventModel>;
  emitGet(service: IEventService, id: string): Observable<IEventModel>;
}
