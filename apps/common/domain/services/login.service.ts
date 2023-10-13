import { IUserDomainEntity } from '@domain/entities';
import { Observable } from 'rxjs';

export interface IUserLoginService {
  login(email: string, password: string): Observable<IUserDomainEntity>;
}
