import { IUserDTO } from '@domain/dto';
import { IUserDomainService } from '@domain/services';
import { IUseCase } from '../../interface/use-case.interface';
export class RegisterUserUseCase implements IUseCase {
  constructor(private readonly userService: IUserDomainService) {}
  execute(user: IUserDTO) {
    return this.userService.createUser(user);
  }
}
