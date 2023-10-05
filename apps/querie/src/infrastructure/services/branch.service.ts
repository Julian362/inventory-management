import { BranchPostgresService } from '@infrastructure-querie/persistence';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BranchService extends BranchPostgresService {}
