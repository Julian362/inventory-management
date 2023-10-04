import {
  BranchEntity,
  ProductEntity,
  UserEntity,
} from '@alpha-infrastructure/entities';
import { EventService } from '@alpha-infrastructure/services';
import { EventModel } from '@alpha-infrastructure/utils/models';
import { IStoreEvent } from '@domain/event';
import { IEventModel } from '@domain/utils/models/interfaces';
import { InventoryEventPublisherEnum } from '@enums';
import { Inject, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class StoreEvent implements IStoreEvent {
  constructor(@Inject(EventService) private readonly service: EventService) {}
  emitCreate(
    data: UserEntity | ProductEntity | BranchEntity,
    typeName: InventoryEventPublisherEnum,
  ): Observable<IEventModel> {
    const event = new EventModel();
    event.aggregateRootId =
      'branchId' in data ? data.branchId.valueOf() : data.id.valueOf();
    event.occurredOn = new Date();
    event.typeName = typeName;
    event.eventBody = JSON.stringify(data);
    return this.service.create(event);
  }
}
