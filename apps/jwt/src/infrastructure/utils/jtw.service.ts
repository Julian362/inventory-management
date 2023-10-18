import { UserDomainEntity } from '@domain/entities';
import { IJWTService } from '@domain/services/jtw.service';
import { ILoginResponse } from '@domain/utils/models';
import { Injectable } from '@nestjs/common';
import { JwtService as Service } from '@nestjs/jwt';
import { Observable, of } from 'rxjs';

@Injectable()
export class JWTService implements IJWTService {
  constructor(private readonly jwtService: Service) {}
  generateToken(user: UserDomainEntity): Observable<ILoginResponse> {
    const data = {
      userId: user.id,
      role: user.role,
      branchId: user.branchId ? user.branchId : '1',
    };

    const token = this.jwtService.sign(data);

    return of({ token, data });
  }

  verify(token: string, id: string): Observable<boolean> {
    try {
      this.jwtService.verify(token);
      if (id === this.jwtService.decode(token)['userId']) {
        return of(true);
      }
      return of(false);
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        if (id === this.jwtService.decode(token)['userId']) {
          return of(true);
        }
        return of(false);
      } else {
        return of(false);
      }
    }
  }
}
