import { IEventModel } from '@domain/utils/models/interfaces';
import { Observable } from 'rxjs';

export interface IEventService {
  create(entity: IEventModel): Observable<IEventModel>;
  findById(id: string): Observable<IEventModel>;
}
