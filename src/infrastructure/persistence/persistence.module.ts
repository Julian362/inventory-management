import {
  BranchService,
  EventService,
  ProductService,
  UserService,
} from '@infrastructure/services';
import { Module } from '@nestjs/common';
import { MongoModule } from './mongo';
import { PostgresModule } from './postgres/postgres.module';

@Module({
  imports: [PostgresModule, MongoModule],
  providers: [UserService, BranchService, ProductService, EventService],
  exports: [UserService, BranchService, ProductService, EventService],
})
export class PersistenceModule {}
