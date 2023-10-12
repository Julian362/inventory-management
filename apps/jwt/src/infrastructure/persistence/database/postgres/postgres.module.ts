import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypesOrmPostgresConfigService } from './configs';
import { UserPostgresEntity } from './entities';
import { UserRepository } from './repositories';
import { UserPostgresService } from './services';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypesOrmPostgresConfigService,
    }),
    TypeOrmModule.forFeature([UserPostgresEntity]),
  ],
  providers: [
    TypesOrmPostgresConfigService,
    UserRepository,
    UserPostgresService,
  ],
  exports: [UserRepository, UserPostgresService],
})
export class PostgresModule {}
