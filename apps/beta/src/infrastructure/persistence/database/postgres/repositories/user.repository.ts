import { InjectRepository } from '@nestjs/typeorm';
import { Observable, from } from 'rxjs';
import { Repository } from 'typeorm';
import { UserPostgresEntity } from '../entities';
import { IBase } from './interfaces';

export class UserRepository implements IBase<UserPostgresEntity> {
  constructor(
    @InjectRepository(UserPostgresEntity)
    private readonly userRepository: Repository<UserPostgresEntity>,
  ) {
    this.userRepository = userRepository;
  }
  create(entity: UserPostgresEntity): Observable<UserPostgresEntity> {
    return from(this.userRepository.save(entity));
  }
  findById(id: string): Observable<UserPostgresEntity> {
    return from(
      this.userRepository.findOne({
        where: { id },
      }),
    );
  }
  findAll(): Observable<UserPostgresEntity[]> {
    return from(this.userRepository.find());
  }
}
