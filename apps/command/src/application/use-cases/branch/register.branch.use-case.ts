import { EventPublisher } from '@domain-command/event/publishers';
import { IEventService } from '@domain-command/services';
import { IBranchCommand } from '@domain/command';
import { BranchDomainEntity } from '@domain/entities';
import { TypeNamesEnum } from '@enums';
import { BadRequestException } from '@nestjs/common';
import { Observable, map, switchMap, tap } from 'rxjs';
import { v4 as uuid } from 'uuid';

export class RegisterBranchUseCase {
  constructor(
    private readonly eventService: IEventService,
    private readonly publisher: EventPublisher,
  ) {}
  execute(branch: IBranchCommand): Observable<BranchDomainEntity> {
    const data = new BranchDomainEntity(
      branch.name.valueOf(),
      branch.location.city + ',' + branch.location.country,
    );
    data.id = uuid();
    return this.eventService
      .validateUnique({ name: 'name', value: data.name }, [
        TypeNamesEnum.RegisteredBranch,
      ])
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
            throw new BadRequestException('El nombre de la sucursal ya existe');
          }
        }),
      );
  }
}
