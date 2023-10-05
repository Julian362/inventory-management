import { IBranchDomainEntity } from '@domain/entities';
import { Observable } from 'rxjs';

export interface IBranchDomainService {
  createBranch(branch: IBranchDomainEntity): Observable<IBranchDomainEntity>;
  getBranchById(id: string): Observable<IBranchDomainEntity>;
  getAllBranches(): Observable<IBranchDomainEntity[]>;
}
