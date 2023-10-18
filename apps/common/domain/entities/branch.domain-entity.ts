import {
  BranchLocationValueObject,
  BranchNameValueObject,
} from '@domain/value-objects';
import { ProductDomainEntity } from './product.domain-entity';
import { UserDomainEntity } from './user.domain-entity';

export class BranchDomainEntity {
  id?: string;
  products: ProductDomainEntity[];
  users: UserDomainEntity[];
  name: string;
  location: string;
  constructor(name: string, location: string) {
    this.name = new BranchNameValueObject(name).valueOf();
    new BranchLocationValueObject({
      city: location.split(',')[0],
      country: location.split(',')[1],
    }).valueOf();
    this.location = location;
  }
}
