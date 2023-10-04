import { EventPublisher } from '@domain/event';
import { IEventModel } from '@domain/utils/models/interfaces';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { IEventPublisher } from '@sofka';
import { Observable } from 'rxjs';

@Injectable()
export class RabbitPublisher extends EventPublisher {
  constructor(@Inject('INVENTORY') private readonly proxy: ClientProxy) {
    super(proxy as unknown as IEventPublisher);
  }

  emit<Result = string, Input = IEventModel>(
    pattern: string,
    data: Input,
  ): Observable<Result> {
    return this.proxy.emit(pattern, JSON.stringify(data));
  }
}
