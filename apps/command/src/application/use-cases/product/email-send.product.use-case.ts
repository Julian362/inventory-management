import { SaleDomainEntity } from '@domain/entities';
import { IEmailDomainService } from '@domain/services';
import { Observable } from 'rxjs';

export class EmailSendUseCase {
  constructor(private readonly emailService: IEmailDomainService) {}

  execute(
    from: string,
    to: string[],
    subject: string,
    data: SaleDomainEntity,
  ): Observable<any> {
    return this.emailService.sendEmail(
      from,
      to,
      subject,
      this.emailTemplate(data),
    );
  }

  emailTemplate(data: SaleDomainEntity): string {
    return `<!DOCTYPE html>
      <html>
      <head>
          <style>
              .bg-blue-600 {
                  background-color: #3182ce;
              }
          </style>
      </head>
      <body>
          <div style="padding: 2px; background-color: #f3f4f6;">
              <div style="max-width: 400px; margin: 0 auto; border-radius: 8px; overflow: hidden; background-color: #fff;">
                  <div style="display: flex;">
                      <div style="width: 100%; padding: 1px;">
                          <div class="bg-blue-600" style="background-color: #3182ce;">
                              <div style="padding:2px;">
                                  <h5 style="color: #fff;">Nueva factura</h5>
                                  <div style="display: flex; align-items: flex-end;">
                                      <span style="color: #fff; font-size: 16px; font-weight: bold;">#</span>
                                      <span style="margin-top: 2px; color: #c5d1db; font-weight: bold;"> #${
                                        data.number
                                      }</span>
                                  </div>
                              </div>
                              ${data.products.map((product) => {
                                return product
                                  ? `<div style="display: flex; width: 100%; margin: 3px 0;">
                                  <hr style="border: 1px dashed #fff; width: 100%;">
                              </div>
                              <div style="padding: 2px;">
                                  <div >
                                      <h6 style="color: #fff; font-size: 12px">${product.name} </h6>
                                <h6  style="color: #fff; font-size: 12px; font-weight: bold;"
                                  >Cantidad: ${product.quantity}</h6
                                >
                                <h6  style="color: #fff; font-size: 12px; font-weight: bold;"
                                  >Precio: ${product.price}</h6
                                >
                                </div>
                            </div>`
                                  : '';
                              })}
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </body>
      </html>
      `;
  }
}
