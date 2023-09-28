import { BranchDomainEntity } from '@domain/entities';
import { IEventService } from '@domain/services/event.service';
import { IEventModel } from '@domain/utils/models/interfaces';
import { Observable } from 'rxjs';
import { IBaseDomainEventPublisher } from './interface';

export interface IRegisteredBranchEventPublisher
  extends IBaseDomainEventPublisher {
  emitCreate(
    service: IEventService,
    data: BranchDomainEntity,
  ): Observable<IEventModel>;
  emitGet(service: IEventService, id: string): Observable<IEventModel>;
}
