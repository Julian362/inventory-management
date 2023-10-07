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
import { Observable, map, switchMap } from 'rxjs';
import { v4 as uuid } from 'uuid';
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
      id: uuid(),
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
              .isExist(data.branchId.valueOf(), [
                TypeNamesEnum.RegisteredBranch,
              ])
              .pipe(
                switchMap((isExist) => {
                  if (isExist) {
                    return this.eventService
                      .create(data, TypeNamesEnum.RegisteredUser)
                      .pipe(
                        map((event) => {
                          this.publisher.response = event;
                          this.publisher.typeName =
                            TypeNamesEnum.RegisteredUser;
                          this.publisher.publish();
                          return data;
                        }),
                      );
                  } else {
                    throw new BadRequestException('La sucursal no existe');
                  }
                }),
              );
          } else {
            throw new BadRequestException('El correo del usuario ya existe');
          }
        }),
      );
  }
}
