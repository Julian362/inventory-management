import { IUserDomainEntity } from '@domain/entities';
import { ILoginResponse } from '@domain/utils/models';
import { Observable } from 'rxjs';

export interface IJWTService {
  generateToken(user: IUserDomainEntity): Observable<ILoginResponse>;
  verify(token: string, userId: string): Observable<boolean>;
}
