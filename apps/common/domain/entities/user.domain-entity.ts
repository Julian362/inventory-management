import {
  UserEmailValueObject,
  UserNameValueObject,
  UserPasswordValueObject,
  UserRolValueObject,
} from '@domain/value-objects';

export class UserDomainEntity {
  id?: string;
  fullName: string;
  password: string;
  email: string;
  role: string;
  branchId: string;

  constructor(data: UserDomainEntity) {
    const firstName = this.fullName.split(' ')[0];
    const lastName = this.fullName.split(' ')[1];
    new UserNameValueObject({
      firstName,
      lastName,
    }).valueOf();
    this.fullName = data.fullName;
    this.password = new UserPasswordValueObject(data.password).valueOf();
    this.email = new UserEmailValueObject(data.email).valueOf();
    this.role = new UserRolValueObject(data.role).valueOf();
  }
}
