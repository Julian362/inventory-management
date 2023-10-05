import {
  BranchDomainEntity,
  ProductDomainEntity,
  UserDomainEntity,
} from '@domain/entities';

export interface IEventModel {
  _id?: string;

  aggregateRootId: string;

  eventBody: ProductDomainEntity | UserDomainEntity | BranchDomainEntity;

  occurredOn: Date;

  typeName: string;
}
