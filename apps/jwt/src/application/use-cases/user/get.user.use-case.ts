import { UserDomainEntity } from '@domain/entities';
import { IUserLoginService } from '@domain/services/login.service';
import { ILoginResponse } from '@domain/utils';
import { JWTService } from '@infrastructure-jwt/utils/jtw.service';
import { BadRequestException } from '@nestjs/common';
import { Observable, switchMap } from 'rxjs';
export class GetUserUseCase {
  constructor(
    private readonly userService: IUserLoginService,
    private readonly jwt: JWTService,
  ) {}
  execute(email: string, password: string): Observable<ILoginResponse> {
    const data = {
      email,
      password,
    };
    return this.userService.login(data.email, data.password).pipe(
      switchMap((user: UserDomainEntity) => {
        if (!user)
          throw new BadRequestException('usuario o contraseña incorrecta');
        return this.jwt.generateToken(user);
      }),
    );
  }
}
