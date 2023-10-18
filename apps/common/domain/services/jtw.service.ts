import { UserDomainEntity } from '@domain/entities';
import { ILoginResponse } from '@domain/utils/models';
import { Observable } from 'rxjs';

export interface IJWTService {
  generateToken(user: UserDomainEntity): Observable<ILoginResponse>;
  verify(token: string, userId: string): Observable<boolean>;
}
