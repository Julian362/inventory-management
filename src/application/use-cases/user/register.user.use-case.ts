import { IUserDTO } from '@domain/dto';
import { IRegisteredUserEventPublisher } from '@domain/event/publishers/registeredUser.event-publisher';
import { IUserDomainService } from '@domain/services';
import { IEventService } from '@domain/services/event.service';
import {
  UserEmailValueObject,
  UserNameValueObject,
  UserPasswordValueObject,
  UserRolValueObject,
} from '@domain/value-objects';
import { map } from 'rxjs';
import { UserDomainEntity } from '../../../domain/entities/user.domain-entity';
import { IUseCase } from '../../interface/use-case.interface';
export class RegisterUserUseCase implements IUseCase {
  constructor(
    private readonly userService: IUserDomainService,
    private readonly eventService: IEventService,
  ) {}
  execute(user: IUserDTO, publisher: IRegisteredUserEventPublisher) {
    const data: UserDomainEntity = {
      name: new UserNameValueObject(user.name),
      email: new UserEmailValueObject(user.email),
      password: new UserPasswordValueObject(user.password),
      role: new UserRolValueObject(user.role),
    };
    return this.userService.createUser(data).pipe(
      map((user: UserDomainEntity) => {
        publisher.emitCreate(this.eventService, user);
        return user;
      }),
    );
  }
}
