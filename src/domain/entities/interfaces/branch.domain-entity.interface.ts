import {
  BranchIdValueObject,
  BranchLocationValueObject,
  BranchNameValueObject,
} from '@domain/value-objects';
import { IProductDomainEntity } from './product.domain-entity.interface';
import { IUserDomainEntity } from './user.domain-entity.interface';

export interface IBranchDomainEntity {
  id?: string | BranchIdValueObject;
  product?: IProductDomainEntity[];
  user?: IUserDomainEntity[];
  name?: string | BranchNameValueObject;
  location?: string | BranchLocationValueObject;
}
