import { EventModel } from '@domain/utils/models/event.model';
import { EventRepository } from '../repositories';

export class EventMongoService {
  constructor(private readonly eventRepository: EventRepository) {}
  create(entity: EventModel) {
    return this.eventRepository.create(entity);
  }
  findById(id: string) {
    return this.eventRepository.findById(id);
  }
}
