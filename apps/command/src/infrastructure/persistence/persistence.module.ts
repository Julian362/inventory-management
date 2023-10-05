import { EventService } from '@infrastructure-command/services';
import { Module } from '@nestjs/common';
import { MongoModule } from './database/mongo';

@Module({
  imports: [MongoModule],
  providers: [EventService],
  exports: [EventService],
})
export class PersistenceModule {}
