import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Observable, from } from 'rxjs';
import { EventMongo } from '../schemas';
import { IBaseRepository } from './Interface';

export class EventRepository implements IBaseRepository<EventMongo> {
  constructor(
    @InjectModel(EventMongo.name)
    private readonly repository: Model<EventMongo>,
  ) {}

  create(entity: EventMongo): Observable<EventMongo> {
    return from(this.repository.create(entity));
  }

  findById(id: string): Observable<EventMongo> {
    return from(this.repository.findById(id));
  }
}
