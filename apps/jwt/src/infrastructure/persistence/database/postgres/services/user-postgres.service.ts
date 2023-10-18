import { UserDomainEntity } from '@domain/entities/user.domain-entity';
import { IUserDomainService } from '@domain/services';
import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserPostgresEntity } from '../entities';
import { UserRepository } from '../repositories';

@Injectable()
export class UserPostgresService implements IUserDomainService {
  constructor(private readonly userRepository: UserRepository) {}
  createUser(user: UserPostgresEntity): Observable<UserPostgresEntity> {
    return this.userRepository.create(user);
  }
  getUserById(id: string): Observable<UserPostgresEntity> {
    return this.userRepository.findById(id);
  }

  getAllUsers(): Observable<UserDomainEntity[]> {
    return this.userRepository.findAll();
  }

  login(email: string, password: string): Observable<UserDomainEntity> {
    return this.userRepository.Login(email, password);
  }

  getAllAdmins(branchId: string): Observable<UserDomainEntity[]> {
    return this.userRepository.getAllAdmins(branchId);
  }
}
