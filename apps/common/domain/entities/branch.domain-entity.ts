import {
  BranchIdValueObject,
  BranchLocationValueObject,
  BranchNameValueObject,
} from '@domain/value-objects';
import { IBranchDomainEntity } from './interfaces';
import { ProductDomainEntity } from './product.domain-entity';
import { UserDomainEntity } from './user.domain-entity';

export class BranchDomainEntity implements IBranchDomainEntity {
  id?: string | BranchIdValueObject;
  products: ProductDomainEntity[];
  users: UserDomainEntity[];
  name: string | BranchNameValueObject;
  location: string | BranchLocationValueObject;
  constructor(data: IBranchDomainEntity) {
    this.name = data.name;
    this.location = data.location;
  }
}
