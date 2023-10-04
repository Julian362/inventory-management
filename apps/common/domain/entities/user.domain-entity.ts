import {
  BranchIdValueObject,
  UserEmailValueObject,
  UserIdValueObject,
  UserNameValueObject,
  UserPasswordValueObject,
  UserRolValueObject,
} from '@domain/value-objects';
import { IUserDomainEntity } from './interfaces';

export class UserDomainEntity implements IUserDomainEntity {
  id?: string | UserIdValueObject;
  name: string | UserNameValueObject;
  password: string | UserPasswordValueObject;
  email: string | UserEmailValueObject;
  role: string | UserRolValueObject;

  branchId: string | BranchIdValueObject;

  constructor(data: IUserDomainEntity) {
    this.name = data.name;
    this.password = data.password;
    this.email = data.email;
    this.role = data.role;
  }
}
