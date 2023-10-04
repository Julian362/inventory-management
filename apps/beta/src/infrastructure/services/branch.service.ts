import { BranchPostgresService } from '@beta-infrastructure/persistence/database/postgres';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BranchService extends BranchPostgresService {}
