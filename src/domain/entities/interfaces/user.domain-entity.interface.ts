import {
  UserEmailValueObject,
  UserIdValueObject,
  UserNameValueObject,
  UserPasswordValueObject,
  UserRolValueObject,
} from '@domain/value-objects/user';

export interface IUserDomainEntity {
  id?: string | UserIdValueObject;
  name: string | UserNameValueObject;
  password: string | UserPasswordValueObject;
  email: string | UserEmailValueObject;
  role: string | UserRolValueObject;
}
