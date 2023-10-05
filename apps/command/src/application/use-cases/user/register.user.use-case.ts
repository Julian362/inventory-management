import { EventPublisher } from '@domain-command/event';
import { IUserCommand } from '@domain/command';
import { UserDomainEntity } from '@domain/entities';
import {
  BranchIdValueObject,
  UserEmailValueObject,
  UserNameValueObject,
  UserPasswordValueObject,
  UserRolValueObject,
} from '@domain/value-objects';
import { TypeNamesEnum } from '@enums';
import { EventService } from '@infrastructure-command/services';
import { BadRequestException } from '@nestjs/common';
import { FullNameType } from '@types';
import { Observable, map, switchMap, tap } from 'rxjs';
export class RegisterUserUseCase {
  constructor(
    private readonly eventService: EventService,
    private readonly publisher: EventPublisher,
  ) {}
  execute(user: IUserCommand): Observable<UserDomainEntity> {
    const name = new UserNameValueObject({
      firstName: user.name.firstName,
      lastName: user.name.lastName,
    } as FullNameType);
    const data: UserDomainEntity = {
      name: name.valueOf().firstName + ' ' + name.valueOf().lastName,
      email: new UserEmailValueObject(user.email).valueOf(),
      password: new UserPasswordValueObject(user.password).valueOf(),
      role: new UserRolValueObject(user.role).valueOf(),
      branchId: new BranchIdValueObject(user.branchId).valueOf(),
    };
    return this.eventService
      .validaUnique(
        { name: 'email', value: data.email.valueOf() },
        data.branchId.valueOf(),
      )
      .pipe(
        switchMap((isValid) => {
          if (!isValid) {
            return this.eventService
              .create(data, TypeNamesEnum.RegisteredUser)
              .pipe(
                tap((event) => {
                  this.publisher.response = event;
                  this.publisher.typeName = TypeNamesEnum.RegisteredUser;
                  this.publisher.publish();
                }),
                map(() => data),
              );
          } else {
            throw new BadRequestException('El correo del usuario ya existe');
          }
        }),
      );
  }
}
