import { IUserCommand } from '@domain/command';
import { UserDomainEntity } from '@domain/entities';
import { EventPublisher, IStoreEvent } from '@domain/event';
import {
  BranchIdValueObject,
  UserEmailValueObject,
  UserNameValueObject,
  UserPasswordValueObject,
  UserRolValueObject,
} from '@domain/value-objects';
import { InventoryEventPublisherEnum } from '@enums';
import { FullNameType } from '@types';
import { Observable, map, tap } from 'rxjs';
export class RegisterUserUseCase {
  constructor(
    private readonly eventStore: IStoreEvent,
    private readonly publisher: EventPublisher,
  ) {}
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
    return this.eventStore
      .emitCreate(data, InventoryEventPublisherEnum.RegisteredUser)
      .pipe(
        tap((event) => {
          this.publisher.response = event;
          this.publisher.typeName = InventoryEventPublisherEnum.RegisteredUser;
          this.publisher.publish();
        }),
        map(() => data),
      );
  }
}
