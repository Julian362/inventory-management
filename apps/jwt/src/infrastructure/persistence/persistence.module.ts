import { UserService } from '@infrastructure-jwt/services';
import { Module } from '@nestjs/common';
import { PostgresModule } from './database/postgres';

@Module({
  imports: [PostgresModule],
  providers: [UserService],
  exports: [UserService],
})
export class PersistenceModule {}
