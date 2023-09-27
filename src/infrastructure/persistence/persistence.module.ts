import { Module } from '@nestjs/common';
import { BranchService, ProductService, UserService } from '../services';
import { MongoModule } from './mongo';
import { PostgresModule } from './postgres/postgres.module';

@Module({
  imports: [PostgresModule, MongoModule],
  providers: [UserService, BranchService, ProductService],
  exports: [UserService, BranchService, ProductService],
})
export class PersistenceModule {}
