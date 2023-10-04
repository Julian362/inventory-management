import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';

@Schema({
  collection: 'events',
  versionKey: false,
  strict: false,
})
export class EventMongo {
  @Prop({
    type: SchemaTypes.ObjectId,
    auto: true,
  })
  _id?: string;

  @Prop({ type: String, required: true })
  aggregateRootId: string;

  @Prop({ type: String, required: true })
  eventBody: string;

  @Prop({ type: Date, required: true })
  occurredOn: Date;

  @Prop({ type: String, required: true })
  typeName: string;
}

export const EventSchema = SchemaFactory.createForClass(EventMongo);

export type EventDocument = HydratedDocument<EventMongo>;
