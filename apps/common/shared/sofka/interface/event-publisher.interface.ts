import { Observable } from 'rxjs';
export interface IEventPublisher {
  send<Result = any, Input = any>(
    pattern: any,
    data: Input,
  ): Observable<Result>;
  emit<Result = any, Input = any>(
    pattern: any,
    data: Input,
  ): Observable<Result>;
}
