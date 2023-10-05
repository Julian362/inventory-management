import { InjectRepository } from '@nestjs/typeorm';
import { Observable, from } from 'rxjs';
import { Repository } from 'typeorm';
import { BranchPostgresEntity } from '../entities';
import { IBase } from './interfaces';

export class BranchRepository implements IBase<BranchPostgresEntity> {
  constructor(
    @InjectRepository(BranchPostgresEntity)
    private readonly branchRepository: Repository<BranchPostgresEntity>,
  ) {}
  create(entity: BranchPostgresEntity): Observable<BranchPostgresEntity> {
    return from(this.branchRepository.save(entity));
  }
  findById(id: string): Observable<BranchPostgresEntity> {
    return from(
      this.branchRepository.findOne({
        where: { id },
      }),
    );
  }
  findAll(): Observable<BranchPostgresEntity[]> {
    return from(this.branchRepository.find());
  }
}
