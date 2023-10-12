import { UserDomainEntity } from '@domain/entities';
import { IEventModel } from '@domain/utils';
import { QueueEnum, TypeNamesEnum } from '@enums';
import { RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { UserCommandJWT } from '@infrastructure-jwt/command';
import { Controller } from '@nestjs/common';
import { EXCHANGE } from '@shared/const';
import { RegisterUserUseCase } from 'applications-jwt/use-cases';
import { Observable } from 'rxjs';

@Controller()
export class JWTSubscriber {
  constructor(private readonly registerUserUseCase: RegisterUserUseCase) {}

  //User
  @RabbitRPC({
    exchange: EXCHANGE,
    routingKey: TypeNamesEnum.RegisteredUser,
    queue: QueueEnum.UserJWT,
  })
  toCreateUser(event: IEventModel): Observable<UserDomainEntity> {
    const user: UserCommandJWT = event.eventBody as UserCommandJWT;
    return this.registerUserUseCase.execute({
      id: user.id,
      name: {
        firstName: user.name.split(' ')[0],
        lastName: user.name.split(' ')[1],
      },
      email: user.email,
      password: user.password,
      role: user.role,
      branchId: user.branchId,
    });
  }
}
