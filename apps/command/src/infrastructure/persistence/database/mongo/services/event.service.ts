import { IEventService } from '@domain-command/services';
import { EventModelDomain } from '@domain-command/utils/models/event.model';
import { IEventModel } from '@domain-command/utils/models/interfaces';
import {
  BranchDomainEntity,
  ProductDomainEntity,
  UserDomainEntity,
} from '@domain/entities';
import { EventModel } from '@domain/utils/models';
import { TypeNamesEnum } from '@enums';
import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { EventRepository } from '../repositories';

@Injectable()
export class EventMongoService implements IEventService {
  constructor(private readonly eventRepository: EventRepository) {}
  validateUnique(
    field: { name: string; value: string },
    aggregateRootId?: string,
  ): Observable<boolean> {
    return this.eventRepository.validateUnique(field, aggregateRootId);
  }
  create(
    data: UserDomainEntity | ProductDomainEntity | BranchDomainEntity,
    typeName: TypeNamesEnum,
  ): Observable<IEventModel> {
    const event = new EventModelDomain();
    event.aggregateRootId =
      'branchId' in data ? data.branchId.valueOf() : data.id.valueOf();
    event.eventBody = data;
    event.occurredOn = new Date();
    event.typeName = typeName;
    return this.eventRepository.create(event);
  }
  findById(id: string) {
    return this.eventRepository.findById(id);
  }

  findByEntityId(
    id: string,
    typesNames: TypeNamesEnum[],
  ): Observable<EventModel> {
    return this.eventRepository.findByEntityId(id, typesNames);
  }

  validaUnique(
    field: {
      name: string;
      value: string;
    },
    aggregateRootId?: string,
  ): Observable<boolean> {
    return this.eventRepository.validateUnique(field, aggregateRootId);
  }
}
