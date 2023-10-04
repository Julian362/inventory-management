import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypesOrmPostgresConfigService } from './configs';
import {
  BranchPostgresEntity,
  ProductPostgresEntity,
  UserPostgresEntity,
} from './entities';
import {
  BranchRepository,
  ProductRepository,
  UserRepository,
} from './repositories';
import { BranchPostgresService, UserPostgresService } from './services';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypesOrmPostgresConfigService,
    }),
    TypeOrmModule.forFeature([
      ProductPostgresEntity,
      UserPostgresEntity,
      BranchPostgresEntity,
    ]),
  ],
  providers: [
    TypesOrmPostgresConfigService,
    ProductRepository,
    UserRepository,
    BranchRepository,
    BranchPostgresService,
    UserPostgresService,
    ProductPostgresEntity,
  ],
  exports: [
    ProductRepository,
    UserRepository,
    BranchRepository,
    BranchPostgresService,
    UserPostgresService,
    ProductPostgresEntity,
  ],
})
export class PostgresModule {}
