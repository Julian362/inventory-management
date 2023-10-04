import { IUserCommand } from '@domain/command';
import { UserDomainEntity } from '@domain/entities';
import { IUserDomainService } from '@domain/services';
import {
  BranchIdValueObject,
  UserEmailValueObject,
  UserNameValueObject,
  UserPasswordValueObject,
  UserRolValueObject,
} from '@domain/value-objects';
import { FullNameType } from '@types';
import { Observable } from 'rxjs';
export class RegisterUserUseCase {
  constructor(private readonly userService: IUserDomainService) {}
  execute(user: IUserCommand): Observable<UserDomainEntity> {
    const name = new UserNameValueObject({
      FirstName: user.name.firstName,
      LastName: user.name.lastName,
    } as FullNameType);
    const data: UserDomainEntity = {
      name: name.valueOf().FirstName + ' ' + name.valueOf().LastName,
      email: new UserEmailValueObject(user.email).valueOf(),
      password: new UserPasswordValueObject(user.password).valueOf(),
      role: new UserRolValueObject(user.role).valueOf(),
      branchId: new BranchIdValueObject(user.branchId).valueOf(),
    };
    return this.userService.createUser(data);
  }
}
