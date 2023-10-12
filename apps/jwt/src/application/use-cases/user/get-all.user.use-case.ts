import { UserDomainEntity } from '@domain/entities';
import { IUserDomainService } from '@domain/services';
import { map } from 'rxjs';
export class GetAllUserUseCase {
  constructor(private readonly userService: IUserDomainService) {}
  execute() {
    return this.userService.getAllUsers().pipe(
      map((user: UserDomainEntity[]) => {
        return user;
      }),
    );
  }
}
