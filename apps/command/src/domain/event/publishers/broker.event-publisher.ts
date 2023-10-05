import { IEventModel } from '@domain-command/utils/models/interfaces';
import { TypeNamesEnum } from '@enums';
import { EventPublisherBase } from '@sofka';
import { Observable } from 'rxjs';

export abstract class EventPublisher<
  Response = IEventModel,
> extends EventPublisherBase<Response> {
  typeName: TypeNamesEnum;
  publish<Result = string>(): Observable<Result> {
    return this.emit('inventory_exchange', this.typeName, this.response);
  }
}
