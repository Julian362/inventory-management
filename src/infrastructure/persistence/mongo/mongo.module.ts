import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseConfigService } from './config';
import { EventRepository } from './repositories';
import { EventMongo, EventSchema } from './schemas';
import { EventMongoService } from './services/event.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService,
    }),
    MongooseModule.forFeature([
      {
        name: EventMongo.name,
        schema: EventSchema,
      },
    ]),
  ],
  controllers: [],
  providers: [MongooseConfigService, EventMongoService, EventRepository],
  exports: [EventMongoService, EventRepository],
})
export class MongoModule {}
