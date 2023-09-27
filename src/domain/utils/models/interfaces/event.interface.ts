export interface IEventModel {
  _id?: string;

  aggregateRootId: string;

  eventBody: string;

  occurredOn: Date;

  typeName: string;
}
