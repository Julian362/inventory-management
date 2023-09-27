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
  product?: ProductDomainEntity[];
  user?: UserDomainEntity[];
  name?: string | BranchNameValueObject;
  location?: string | BranchLocationValueObject;
  constructor(data: IBranchDomainEntity) {
    if (data?.product) this.product = data.product;
    if (data?.user) this.user = data.user;
    if (data?.name) this.name = data.name;
    if (data?.location) this.location = data.location;
  }
}
