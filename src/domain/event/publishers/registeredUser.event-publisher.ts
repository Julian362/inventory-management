import { UserDomainEntity } from '@domain/entities/user.domain-entity';
import { IEventService } from '@domain/services/event.service';
import { IEventModel } from '@domain/utils/models/interfaces/event.interface';
import { Observable } from 'rxjs';
import { IBaseDomainEventPublisher } from './interface/base.event-publisher';

export interface IRegisteredUserEventPublisher
  extends IBaseDomainEventPublisher {
  emitCreate(
    event: IEventService,
    data: UserDomainEntity,
  ): Observable<IEventModel>;
  emitGet(event: IEventService, id: string): Observable<IEventModel>;
}
