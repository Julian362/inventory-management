import {
  BranchDomainEntity,
  ProductDomainEntity,
  UserDomainEntity,
} from '@domain/entities';
import { SaleDomainEntity } from '@domain/entities/sale.domain-entity';
import { IEventModel } from './interfaces';

export class EventModelDomain implements IEventModel {
  _id?: string;

  aggregateRootId: string;

  eventBody:
    | ProductDomainEntity
    | UserDomainEntity
    | BranchDomainEntity
    | SaleDomainEntity;

  occurredOn: Date;

  typeName: string;
}
