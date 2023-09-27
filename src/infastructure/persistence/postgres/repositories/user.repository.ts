import { InjectRepository } from '@nestjs/typeorm';
import { Observable, from } from 'rxjs';
import { UserDTO } from 'src/infastructure/dto';
import { Repository } from 'typeorm';
import { UserPostgresEntity } from '../entities/user.postgres-entity';
import { IBase } from './interfaces/base.interface';

export class UserRepository implements IBase<UserPostgresEntity> {
  constructor(
    @InjectRepository(UserPostgresEntity)
    private readonly userRepository: Repository<UserPostgresEntity>,
  ) {
    this.userRepository = userRepository;
  }
  create(entity: UserDTO): Observable<UserPostgresEntity> {
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
