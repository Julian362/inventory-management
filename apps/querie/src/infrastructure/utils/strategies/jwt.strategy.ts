import { UserDomainEntity } from '@domain/entities';
import { JwtPayload } from '@domain/utils';
import { UserService } from '@infrastructure-querie/services';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Observable, of, switchMap, throwError } from 'rxjs';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }
  validate(payload: JwtPayload): Observable<JwtPayload> {
    const { userId } = payload;

    return this.userService.getUserById(userId).pipe(
      switchMap((user: UserDomainEntity) => {
        if (!user)
          throwError(() => new UnauthorizedException('Token no valido'));
        return of({
          userId: user.id,
          role: user.role,
          branchId: user.branchId ? user.branchId : null,
        });
      }),
    );
  }
}
