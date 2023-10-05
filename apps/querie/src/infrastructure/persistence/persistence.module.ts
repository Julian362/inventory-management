import {
  BranchService,
  ProductService,
  UserService,
} from '@infrastructure-querie/services';
import { Module } from '@nestjs/common';
import { PostgresModule } from './database/postgres';

@Module({
  imports: [PostgresModule],
  providers: [UserService, BranchService, ProductService],
  exports: [UserService, BranchService, ProductService],
})
export class PersistenceModule {}
