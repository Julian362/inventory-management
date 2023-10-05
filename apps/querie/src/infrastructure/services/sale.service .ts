import { SalePostgresService } from '@infrastructure-querie/persistence/database/postgres';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SaleService extends SalePostgresService {}
