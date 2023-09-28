import { UserDomainEntity } from '@domain/entities';
import { IEventService } from '@domain/services';
import { IEventModel } from '@domain/utils/models/interfaces';
import { Observable } from 'rxjs';
import { IBaseDomainEventPublisher } from './interface';

export interface IRegisteredUserEventPublisher
  extends IBaseDomainEventPublisher {
  emitCreate(
    event: IEventService,
    data: UserDomainEntity,
  ): Observable<IEventModel>;
  emitGet(event: IEventService, id: string): Observable<IEventModel>;
}
