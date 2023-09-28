import { EventModel } from '@infrastructure/utils/models';
import { Injectable } from '@nestjs/common';
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
