import {
  BranchDomainEntity,
  ProductDomainEntity,
  UserDomainEntity,
} from '@domain/entities';
import { IEventModel } from './interfaces';

export class EventModelDomain implements IEventModel {
  _id?: string;

  aggregateRootId: string;

  eventBody: ProductDomainEntity | UserDomainEntity | BranchDomainEntity;

  occurredOn: Date;

  typeName: string;
}
