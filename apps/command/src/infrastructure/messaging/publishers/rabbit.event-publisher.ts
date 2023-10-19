import { IEventModel } from '@domain/utils/models/interfaces';
import { TypeNamesEnum } from '@enums';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { IEventPublisher } from '@sofka';
import { Observable, from } from 'rxjs';
import { EventPublisher } from '../../../domain/event/publishers/broker.event-publisher';

@Injectable()
export class RabbitPublisher extends EventPublisher {
  constructor(private readonly proxy: AmqpConnection) {
    super(proxy as unknown as IEventPublisher);
  }

  emit<Result = string, Input = IEventModel>(
    exchange: string,
    pattern: TypeNamesEnum,
    data: Input,
  ): Observable<Result> {
    return from(this.proxy.publish(exchange, pattern, data));
  }
}
