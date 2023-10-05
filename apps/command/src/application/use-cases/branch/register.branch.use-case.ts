import { EventPublisher } from '@domain-command/event/publishers';
import { IEventService } from '@domain-command/services';
import { IBranchCommand } from '@domain/command';
import { BranchDomainEntity } from '@domain/entities';
import {
  BranchLocationValueObject,
  BranchNameValueObject,
} from '@domain/value-objects';
import { TypeNamesEnum } from '@enums';
import { BadRequestException } from '@nestjs/common';
import { LocationType } from '@types';
import { Observable, map, switchMap, tap } from 'rxjs';
import { v4 as uuid } from 'uuid';

export class RegisterBranchUseCase {
  constructor(
    private readonly eventService: IEventService,
    private readonly publisher: EventPublisher,
  ) {}
  execute(branch: IBranchCommand): Observable<BranchDomainEntity> {
    const location = new BranchLocationValueObject({
      city: branch.location.city,
      country: branch.location.country,
    } as LocationType);
    const data: BranchDomainEntity = {
      name: new BranchNameValueObject(branch.name).valueOf(),
      location: location.valueOf().city + ', ' + location.valueOf().country,
      users: [],
      products: [],
      id: uuid(),
    };
    return this.eventService
      .validateUnique({ name: 'name', value: data.name.valueOf() })
      .pipe(
        switchMap((isValid) => {
          if (!isValid) {
            return this.eventService
              .create(data, TypeNamesEnum.RegisteredBranch)
              .pipe(
                tap((event) => {
                  this.publisher.response = event;
                  this.publisher.typeName = TypeNamesEnum.RegisteredBranch;
                  this.publisher.publish();
                }),
                map(() => data),
              );
          } else {
            throw new BadRequestException('El nombre de la branch ya existe');
          }
        }),
      );
  }
}
