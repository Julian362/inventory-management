import { IEventModel } from '@domain/utils/models/interfaces/';
import { Observable } from 'rxjs';

export interface IBaseDomainEventPublisher {
  emitCreate(...args: any[]): Observable<IEventModel>;
  emitGet(...args: any[]): Observable<IEventModel>;
}
