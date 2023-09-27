import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypesOrmPostgresConfigService } from './configs';
import { BranchPostgresEntity } from './entities/branch.postgres-entity';
import { ProductPostgresEntity } from './entities/product.postgres-entity';
import { UserPostgresEntity } from './entities/user.postgres-entity';
import {
  BranchRepository,
  ProductRepository,
  UserRepository,
} from './repositories';
import { BranchPostgresService } from './services/branch-postgres.service';
import { UserPostgresService } from './services/user-postgres.service';

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
