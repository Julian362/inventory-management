import { IUserCommand } from '@domain/command';
import { IRegisteredUserEventPublisher } from '@domain/event/publishers/registeredUser.event-publisher';
import { IUserDomainService } from '@domain/services';
import { IEventService } from '@domain/services/event.service';
import {
  BranchIdValueObject,
  UserEmailValueObject,
  UserNameValueObject,
  UserPasswordValueObject,
  UserRolValueObject,
} from '@domain/value-objects';
import { FullNameType } from '@types';
import { map } from 'rxjs';
import { UserDomainEntity } from '../../../domain/entities/user.domain-entity';
import { IUseCase } from '../../interface/use-case.interface';
export class RegisterUserUseCase implements IUseCase {
  constructor(
    private readonly userService: IUserDomainService,
    private readonly eventService: IEventService,
  ) {}
  execute(user: IUserCommand, publisher: IRegisteredUserEventPublisher) {
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
    return this.userService.createUser(data).pipe(
      map((user: UserDomainEntity) => {
        publisher.emitCreate(this.eventService, user);
        return user;
      }),
    );
  }
}
