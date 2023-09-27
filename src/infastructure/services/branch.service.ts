import { Injectable } from '@nestjs/common';
import { BranchPostgresService } from '../persistence/postgres/services/branch-postgres.service';

@Injectable()
export class BranchService extends BranchPostgresService {}
