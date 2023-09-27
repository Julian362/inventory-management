import { UserDomainEntity } from '@domain/entities/user.domain-entity';
import { Observable } from 'rxjs';

export interface IUserDomainService {
  createUser(user: UserDomainEntity): Observable<UserDomainEntity>;
  getUserById(id: string): Observable<UserDomainEntity>;
  getAllUsers(): Observable<UserDomainEntity[]>;
}
