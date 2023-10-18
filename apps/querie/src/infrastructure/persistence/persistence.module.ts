import {
  BranchService,
  ProductService,
  UserService,
} from '@infrastructure-querie/services';
import { SaleService } from '@infrastructure-querie/services/sale.service';
import { Module } from '@nestjs/common';
import { EmailService } from '@shared/services/email.service';
import { PostgresModule } from './database/postgres';

@Module({
  imports: [PostgresModule],
  providers: [
    UserService,
    BranchService,
    ProductService,
    SaleService,
    EmailService,
  ],
  exports: [
    UserService,
    BranchService,
    ProductService,
    SaleService,
    EmailService,
  ],
})
export class PersistenceModule {}
