import { UserDomainEntity } from '@domain/entities';
import { JwtPayload } from '@domain/utils';
import { EventModelDomain } from '@domain/utils/models';
import { TypeNamesEnum } from '@enums';
import { EventService } from '@infrastructure-command/services';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Observable, of, switchMap, throwError } from 'rxjs';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: EventService) {
    super({
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }
  validate(payload: JwtPayload): Observable<JwtPayload> {
    const { userId } = payload;

    return this.userService
      .findByEntityId(userId, [TypeNamesEnum.RegisteredUser])
      .pipe(
        switchMap((event: EventModelDomain) => {
          if (!event)
            throwError(() => new UnauthorizedException('Token no valido'));
          const user = event.eventBody as UserDomainEntity;
          return of({
            userId: user.id.valueOf(),
            role: user.role.valueOf(),
            branchId: user.branchId.valueOf(),
          });
        }),
      );
  }
}
