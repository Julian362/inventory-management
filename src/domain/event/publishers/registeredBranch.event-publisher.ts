import { BranchDomainEntity } from '@domain/entities/branch.domain-entity';
import { IEventService } from '@domain/services/event.service';
import { IEventModel } from '@domain/utils/models/interfaces/event.interface';
import { Observable } from 'rxjs';
import { IBaseDomainEventPublisher } from './interface/base.event-publisher';

export interface IRegisteredBranchEventPublisher
  extends IBaseDomainEventPublisher {
  emitCreate(
    service: IEventService,
    data: BranchDomainEntity,
  ): Observable<IEventModel>;
  emitGet(service: IEventService, id: string): Observable<IEventModel>;
}
