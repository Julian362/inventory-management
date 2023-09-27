import { IEventModel } from '@domain/utils/models/interfaces/event.interface';
import { Observable } from 'rxjs';

export interface IBaseEventPublisher {
  emitCreate(...args: any[]): Observable<IEventModel>;
  emitGet(...args: any[]): Observable<IEventModel>;
}
