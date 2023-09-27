import {
  UserEmailValueObject,
  UserIdValueObject,
  UserNameValueObject,
  UserPasswordValueObject,
  UserRolValueObject,
} from '@domain/value-objects';
import { IUserDomainEntity } from './interfaces';

export class UserDomainEntity implements IUserDomainEntity {
  id?: string | UserIdValueObject;
  name?: string | UserNameValueObject;
  password?: string | UserPasswordValueObject;
  email?: string | UserEmailValueObject;
  role?: string | UserRolValueObject;

  constructor(data: IUserDomainEntity) {
    if (data?.name) this.name = data.name;
    if (data?.password) this.password = data.password;
    if (data?.email) this.email = data.email;
    if (data?.role) this.role = data.role;
  }
}
