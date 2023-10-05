import { IUserDomainEntity, UserDomainEntity } from '@domain/entities';
import { Observable } from 'rxjs';

export interface IUserDomainService {
  createUser(user: UserDomainEntity): Observable<IUserDomainEntity>;
  getUserById(id: string): Observable<IUserDomainEntity>;
  getAllUsers(): Observable<IUserDomainEntity[]>;
}
