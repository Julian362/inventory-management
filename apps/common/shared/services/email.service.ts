import { IEmailDomainService } from '@domain/services/email.service';
import { Resend } from 'resend';
import { Observable, catchError, of, throwError } from 'rxjs';

export class EmailService implements IEmailDomainService {
  private resend: Resend;

  constructor() {
    this.resend = new Resend(process.env.API_EMAIL); // Reemplaza con tu API Key de Resend
  }

  sendEmail(
    from: string,
    to: string[],
    subject: string,
    html: string,
  ): Observable<any> {
    return of(
      this.resend.emails.send({
        from: from,
        to: to,
        subject: subject,
        html: html,
      }),
    ).pipe(
      catchError((error) => {
        return throwError(() => error);
      }),
    );
  }
}
