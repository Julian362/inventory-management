import { UserDomainEntity } from '@domain/entities';
import { IUserDomainService } from '@domain/services';
import { UserIdValueObject } from '@domain/value-objects';
import { map } from 'rxjs';
export class GetUserUseCase {
  constructor(private readonly userService: IUserDomainService) {}
  execute(id: string) {
    const data = {
      id: new UserIdValueObject(id).valueOf(),
    };
    return this.userService.getUserById(data.id).pipe(
      map((user: UserDomainEntity) => {
        return user;
      }),
    );
  }
}
