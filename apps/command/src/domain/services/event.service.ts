import { IEventModel } from '@domain-command/utils/models/interfaces';
import {
  BranchDomainEntity,
  ProductDomainEntity,
  UserDomainEntity,
} from '@domain/entities';
import { TypeNamesEnum } from '@enums';
import { Observable } from 'rxjs';

export interface IEventService {
  create(
    data: UserDomainEntity | ProductDomainEntity | BranchDomainEntity,
    typeName: TypeNamesEnum,
  ): Observable<IEventModel>;

  validateUnique(
    field: {
      name: string;
      value: string;
    },
    aggregateRootId?: string,
  ): Observable<boolean>;

  findByEntityId(
    id: string,
    typesNames: TypeNamesEnum[],
  ): Observable<IEventModel>;

  findById(id: string): Observable<IEventModel>;
}
