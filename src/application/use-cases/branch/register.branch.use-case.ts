import { IBranchDomainService } from '@domain/services';
import { IBranchDTO } from 'src/infastructure/dto';
import { IUseCase } from '../../interface/use-case.interface';

export class RegisterBranchUseCase implements IUseCase {
  constructor(private readonly branchService: IBranchDomainService) {}
  execute(branch: IBranchDTO) {
    return this.branchService.createBranch(branch);
  }
}
