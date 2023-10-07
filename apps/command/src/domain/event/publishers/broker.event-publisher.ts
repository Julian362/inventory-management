import { IEventModel } from '@domain/utils/models';
import { TypeNamesEnum } from '@enums';
import { EXCHANGE } from '@shared/const';
import { EventPublisherBase } from '@sofka';
import { Observable } from 'rxjs';

export abstract class EventPublisher<
  Response = IEventModel,
> extends EventPublisherBase<Response> {
  typeName: TypeNamesEnum;
  publish<Result = string>(): Observable<Result> {
    return this.emit(EXCHANGE, this.typeName, this.response);
  }
}
