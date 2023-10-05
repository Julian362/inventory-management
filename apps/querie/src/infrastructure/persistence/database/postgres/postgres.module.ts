import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypesOrmPostgresConfigService } from './configs';
import {
  BranchPostgresEntity,
  ProductPostgresEntity,
  SalePostgresEntity,
  UserPostgresEntity,
} from './entities';
import {
  BranchRepository,
  ProductRepository,
  SaleRepository,
  UserRepository,
} from './repositories';
import {
  BranchPostgresService,
  SalePostgresService,
  UserPostgresService,
} from './services';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypesOrmPostgresConfigService,
    }),
    TypeOrmModule.forFeature([
      ProductPostgresEntity,
      UserPostgresEntity,
      BranchPostgresEntity,
      SalePostgresEntity,
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
    SalePostgresEntity,
    SaleRepository,
    SalePostgresService,
  ],
  exports: [
    ProductRepository,
    UserRepository,
    BranchRepository,
    BranchPostgresService,
    UserPostgresService,
    ProductPostgresEntity,
    SalePostgresEntity,
    SaleRepository,
    SalePostgresService,
  ],
})
export class PostgresModule {}
