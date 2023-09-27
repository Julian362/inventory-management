import { IUserDomainService } from '@domain/services';
import { UserIdValueObject } from '@domain/value-objects';
import { map } from 'rxjs';
import { UserDomainEntity } from '../../../domain/entities/user.domain-entity';
import { IUseCase } from '../../interface/use-case.interface';
export class GetUserUseCase implements IUseCase {
  constructor(private readonly userService: IUserDomainService) {}
  execute(id: string) {
    const data = {
      id: new UserIdValueObject(id),
    };
    return this.userService.getUserById(data.id.valueOf()).pipe(
      map((user: UserDomainEntity) => {
        return user;
      }),
    );
  }
}
