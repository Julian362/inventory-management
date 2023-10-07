import {
  BranchDomainEntity,
  ProductDomainEntity,
  UserDomainEntity,
} from '@domain/entities';
import { SaleDomainEntity } from '@domain/entities/sale.domain-entity';
import { IEventModel } from '@domain/utils/models';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';

@Schema({
  collection: 'events',
  versionKey: false,
  strict: false,
})
export class EventMongo implements IEventModel {
  @Prop({
    type: SchemaTypes.ObjectId,
    auto: true,
  })
  _id?: string;

  @Prop({ type: String, required: true })
  aggregateRootId: string;

  @Prop({ type: Object, required: true })
  eventBody:
    | ProductDomainEntity
    | UserDomainEntity
    | BranchDomainEntity
    | SaleDomainEntity;

  @Prop({ type: Date, required: true })
  occurredOn: Date;

  @Prop({ type: String, required: true })
  typeName: string;
}

export const EventSchema = SchemaFactory.createForClass(EventMongo);

export type EventDocument = HydratedDocument<EventMongo>;
