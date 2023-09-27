import { Module } from '@nestjs/common';
import { BranchService, ProductService, UserService } from '../services';
import { PostgresModule } from './postgres/postgres.module';

@Module({
  imports: [PostgresModule],
  providers: [UserService, BranchService, ProductService],
  exports: [UserService, BranchService, ProductService],
})
export class PersistenceModule {}
