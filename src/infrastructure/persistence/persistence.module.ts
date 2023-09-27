import { Module } from '@nestjs/common';
import { BranchService, ProductService, UserService } from '../services';
import { EventService } from '../services/event.service';
import { MongoModule } from './mongo';
import { PostgresModule } from './postgres/postgres.module';

@Module({
  imports: [PostgresModule, MongoModule],
  providers: [UserService, BranchService, ProductService, EventService],
  exports: [UserService, BranchService, ProductService, EventService],
})
export class PersistenceModule {}
