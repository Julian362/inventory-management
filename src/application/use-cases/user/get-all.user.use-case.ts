import { IUserDomainService } from '@domain/services';
import { map } from 'rxjs';
import { UserDomainEntity } from '../../../domain/entities/user.domain-entity';
import { IUseCase } from '../../interface/use-case.interface';
export class GetAllUserUseCase implements IUseCase {
  constructor(private readonly userService: IUserDomainService) {}
  execute() {
    return this.userService.getAllUsers().pipe(
      map((user: UserDomainEntity[]) => {
        return user;
      }),
    );
  }
}
