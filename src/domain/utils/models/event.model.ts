import { IEventModel } from './interfaces/event.interface';

export class EventModelDomain implements IEventModel {
  _id?: string;

  aggregateRootId: string;

  eventBody: string;

  occurredOn: Date;

  typeName: string;
}
