import { EventModel } from '@alpha-infrastructure/utils/models';
import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { EventRepository } from '../repositories';

@Injectable()
export class EventMongoService {
  constructor(private readonly eventRepository: EventRepository) {}
  create(entity: EventModel): Observable<EventModel> {
    return this.eventRepository.create(entity);
  }
  findById(id: string) {
    return this.eventRepository.findById(id);
  }
}
