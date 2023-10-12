import { IUserDomainService } from '@domain/services';
import { JWTService } from '@infrastructure-jwt/utils/jtw.service';
import { BadRequestException } from '@nestjs/common';
import { ITokenCommand } from 'apps/jwt/src/domain/command';
import { Observable, of, switchMap } from 'rxjs';

export class RefreshTokenUseCase {
  constructor(
    private readonly jwtService: JWTService,
    private readonly userService: IUserDomainService,
  ) {}

  execute(refreshToken: ITokenCommand): Observable<string> {
    return this.jwtService.verify(refreshToken.token, refreshToken.id).pipe(
      switchMap((isExpired) => {
        if (isExpired === true) {
          return this.userService.getUserById(refreshToken.id).pipe(
            switchMap((user) => {
              if (user) {
                return this.jwtService.generateToken(user).pipe(
                  switchMap((response) => {
                    return of(response.token);
                  }),
                );
              } else {
                throw new BadRequestException('token invalido');
              }
            }),
          );
        } else {
          throw new BadRequestException('token invalido');
        }
      }),
    );
  }
}
