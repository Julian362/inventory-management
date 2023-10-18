import { BranchDomainEntity } from '@domain/entities';
import { Observable } from 'rxjs';

export interface IBranchDomainService {
  createBranch(branch: BranchDomainEntity): Observable<BranchDomainEntity>;
  getBranchById(id: string): Observable<BranchDomainEntity>;
  getAllBranches(): Observable<BranchDomainEntity[]>;
}
