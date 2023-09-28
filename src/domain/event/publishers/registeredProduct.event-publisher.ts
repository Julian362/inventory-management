import { ProductDomainEntity } from '@domain/entities';
import { IEventService } from '@domain/services';
import { IEventModel } from '@domain/utils/models/interfaces';
import { Observable } from 'rxjs';
import { IBaseDomainEventPublisher } from './interface';

export interface IRegisteredProductEventPublisher
  extends IBaseDomainEventPublisher {
  emitCreate(
    service: IEventService,
    data: ProductDomainEntity,
  ): Observable<IEventModel>;
  emitGet(service: IEventService, id: string): Observable<IEventModel>;
}
