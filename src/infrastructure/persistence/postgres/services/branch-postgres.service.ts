import { IBranchDomainService } from '@domain/services';
import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { BranchPostgresEntity } from '../entities';
import { BranchRepository } from '../repositories';

@Injectable()
export class BranchPostgresService implements IBranchDomainService {
  constructor(private readonly branchRepository: BranchRepository) {}
  createBranch(branch: BranchPostgresEntity): Observable<BranchPostgresEntity> {
    return this.branchRepository.create(branch);
  }
  getBranchById(id: string): Observable<BranchPostgresEntity> {
    return this.branchRepository.findById(id);
  }
  getAllBranches(): Observable<BranchPostgresEntity[]> {
    return this.branchRepository.findAll();
  }
}
