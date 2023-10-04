import { IEventModel } from './interfaces';

export class EventModelDomain implements IEventModel {
  _id?: string;

  aggregateRootId: string;

  eventBody: string;

  occurredOn: Date;

  typeName: string;
}
