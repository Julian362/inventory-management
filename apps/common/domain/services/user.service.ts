import { UserDomainEntity } from '@domain/entities';
import { Observable } from 'rxjs';

export interface IUserDomainService {
  createUser(user: UserDomainEntity): Observable<UserDomainEntity>;
  getUserById(id: string): Observable<UserDomainEntity>;
  getAllUsers(): Observable<UserDomainEntity[]>;
  getAllAdmins(id: string): Observable<UserDomainEntity[]>;
}
