import { IEventModel } from '@domain/utils/models/interfaces';
import { InventoryEventPublisherEnum } from '@enums';
import { EventPublisherBase } from '@sofka';
import { Observable } from 'rxjs';

export abstract class EventPublisher<
  Response = IEventModel,
> extends EventPublisherBase<Response> {
  typeName: InventoryEventPublisherEnum;
  publish<Result = string>(): Observable<Result> {
    return this.emit(this.typeName, this.response);
  }
}
