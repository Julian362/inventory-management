import {
  BranchDomainEntity,
  ProductDomainEntity,
  UserDomainEntity,
} from '@domain/entities';
import { IEventModel } from '@domain/utils/models/interfaces/';
import { InventoryEventPublisherEnum } from '@enums';
import { Observable } from 'rxjs';

export interface IStoreEvent {
  emitCreate(
    data: UserDomainEntity | ProductDomainEntity | BranchDomainEntity,
    typeName: InventoryEventPublisherEnum,
  ): Observable<IEventModel>;
}
