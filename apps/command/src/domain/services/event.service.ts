import { IEventModel } from '@domain-command/utils/models/interfaces';
import {
  BranchDomainEntity,
  ProductDomainEntity,
  UserDomainEntity,
} from '@domain/entities';
import { SaleDomainEntity } from '@domain/entities/sale.domain-entity';
import { TypeNamesEnum } from '@enums';
import { Observable } from 'rxjs';

export interface IEventService {
  create(
    data:
      | UserDomainEntity
      | ProductDomainEntity
      | BranchDomainEntity
      | SaleDomainEntity,
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

  isExistArray(id: string[]): Observable<boolean>;

  findById(id: string): Observable<IEventModel>;
  isExist(id: string, typeName: TypeNamesEnum[]): Observable<boolean>;

  calculateTotal(): Observable<number>;
}
