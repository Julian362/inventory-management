import {
  BranchService,
  ProductService,
  UserService,
} from '@infrastructure-querie/services';
import { SaleService } from '@infrastructure-querie/services/sale.service';
import { Module } from '@nestjs/common';
import { PostgresModule } from './database/postgres';

@Module({
  imports: [PostgresModule],
  providers: [UserService, BranchService, ProductService, SaleService],
  exports: [UserService, BranchService, ProductService, SaleService],
})
export class PersistenceModule {}
