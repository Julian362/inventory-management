import { Injectable } from '@nestjs/common';
import { EventModel } from 'src/infrastructure/utils/models/event.model';
import { EventRepository } from '../repositories';

@Injectable()
export class EventMongoService {
  constructor(private readonly eventRepository: EventRepository) {}
  create(entity: EventModel) {
    return this.eventRepository.create(entity);
  }
  findById(id: string) {
    return this.eventRepository.findById(id);
  }
}
