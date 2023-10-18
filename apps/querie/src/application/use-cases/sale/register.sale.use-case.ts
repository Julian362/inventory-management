import { SaleDomainEntity } from '@domain/entities';
import {
  IBranchDomainService,
  IEmailDomainService,
  IProductDomainService,
  ISaleDomainService,
  IUserDomainService,
} from '@domain/services';
import {
  Observable,
  catchError,
  forkJoin,
  mergeMap,
  of,
  switchMap,
  throwError,
  timeout,
} from 'rxjs';

export class RegisterSaleUseCase {
  constructor(
    private readonly saleService: ISaleDomainService,
    private readonly branchService: IBranchDomainService,
    private readonly productService: IProductDomainService,
    private readonly userService: IUserDomainService,
    private readonly EmailService: IEmailDomainService,
  ) {}
  execute(sale: SaleDomainEntity): Observable<SaleDomainEntity> {
    return this.saleService.createSale(sale).pipe(
      timeout(2000),
      switchMap((sale) => {
        return forkJoin(
          sale.products.map((productSale) => {
            const name =
              productSale.name ??
              JSON.parse(productSale as unknown as string).name;
            let productSearch = {
              name: 'na',
              price: 0,
              quantity: 0,
            };
            return this.productService.getByName(name).pipe(
              mergeMap((productGet) => {
                if (!productGet) return null;
                productSearch = {
                  name: productGet.name,
                  price: productGet.price,
                  quantity: productGet.quantity,
                };
                const saleProduct = sale.products.find((productFind) => {
                  const productFindName =
                    productFind.name ??
                    JSON.parse(productFind as unknown as string).name;
                  if (productFindName == productSearch.name) {
                    return productFind;
                  }
                });
                if (saleProduct) {
                  const saleProductQuantity =
                    saleProduct.quantity > 0
                      ? saleProduct.quantity
                      : JSON.parse(saleProduct as unknown as string).quantity;
                  const quantityCalculate =
                    productSearch.quantity + saleProductQuantity;
                  if (productSearch.quantity < 5 && quantityCalculate > 5) {
                    return of({
                      name: productSearch.name,
                      price: productSearch.price,
                      quantity: productSearch.quantity,
                    });
                  } else {
                    return of(null);
                  }
                } else {
                  return of(null);
                }
              }),
            );
          }),
        ).pipe(
          switchMap((products) => {
            if (products.length > 0) {
              return this.userService.getAllAdmins(sale.branchId).pipe(
                switchMap((users) => {
                  if (!users || users.length == 0) return of(sale);
                  const productsFilter = products.filter(
                    (product) => product != undefined && product != null,
                  );
                  if (productsFilter.length == 0) return of(sale);
                  return this.EmailService.sendEmail(
                    'tooltraxpro@juliangarcia.tech',
                    users.map((user) => user.email),
                    `Productos con poca existencia, por la venta de la factura #${sale.number}`,
                    `<!DOCTYPE html>
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
                                                  <h5 style="color: #fff;">Productos con inventario bajo</h5>
                                                  <div style="display: flex; align-items: flex-end;">
                                                      <span style="color: #fff; font-size: 16px; font-weight: bold;">A razón de la factura</span>
                                                      <span style="margin-top: 2px; color: #c5d1db; font-weight: bold;"> #${
                                                        sale.number
                                                      }</span>
                                                  </div>
                                              </div>
                                              ${products.map((product) => {
                                                return product
                                                  ? `<div style="display: flex; width: 100%; margin: 3px 0;">
                                                  <hr style="border: 1px dashed #fff; width: 100%;">
                                              </div>
                                              <div style="padding: 2px;">
                                                  <div >
                                                      <h6 style="color: #fff; font-size: 12px">${product.name} </h6>
                                                <h6  style="color: #fff; font-size: 12px; font-weight: bold;"
                                                  >Cantidad actual es: ${product.quantity}</h6
                                                >
                                                </div>
                                            </div>`
                                                  : ' ';
                                              })}
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </body>
                      </html>
                      `,
                  ).pipe(
                    catchError((error) => {
                      console.log('error', error);
                      return throwError(() => error);
                    }),
                    switchMap(() => of(sale)),
                  );
                }),
              );
            }
          }),
        );
      }),
    );
  }
}
