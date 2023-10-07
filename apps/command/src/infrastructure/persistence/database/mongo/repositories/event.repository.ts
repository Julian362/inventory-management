import { TypeNamesEnum } from '@enums';
import { BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Observable, catchError, from, map, of, switchMap } from 'rxjs';
import { EventDocument, EventMongo } from '../schemas';
import { IBaseRepository } from './Interface';

export class EventRepository implements IBaseRepository<EventMongo> {
  constructor(
    @InjectModel(EventMongo.name)
    private readonly repository: Model<EventDocument>,
  ) {}

  create(entity: EventMongo): Observable<EventMongo> {
    return from(this.repository.create(entity));
  }

  findById(id: string): Observable<EventMongo> {
    return from(this.repository.findById(id).exec());
  }

  findByEntityId(
    id: string,
    typesNames: TypeNamesEnum[],
  ): Observable<EventMongo> {
    return from(
      this.repository
        .findOne({
          'eventBody.id': id,
          typeName: {
            $in: typesNames,
          },
        })
        .sort({ occurredOn: -1 })
        .exec(),
    );
  }

  validateUnique(
    field: {
      name: string;
      value: string;
    },
    aggregateRootId?: string,
  ): Observable<boolean> {
    let query: any = {};
    query[`eventBody.${field.name}`] = field.value;
    if (aggregateRootId != undefined) query = { ...query, aggregateRootId };

    return from(this.repository.findOne(query).sort({ _id: -1 }).exec()).pipe(
      catchError((error: Error) => {
        throw new BadRequestException('Invalid', error.message);
      }),
      map((event: EventMongo) => {
        if (event && event !== null) return true;
        return false;
      }),
    );
  }

  calculateTotal(): Observable<number> {
    return from(
      this.repository
        .find({
          typeName: TypeNamesEnum.RegisteredSale,
        })
        .exec(),
    ).pipe(
      switchMap((events: EventMongo[]) => {
        let total = 0;
        events.forEach(() => {
          total++;
        });
        total++;
        return of(total);
      }),
    );
  }
}
