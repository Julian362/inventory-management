import { Observable } from 'rxjs';

export interface IEmailDomainService {
  sendEmail(
    from: string,
    to: string[],
    subject: string,
    html: string,
  ): Observable<any>;
}
