import { EventPublisher } from '@domain-command/event';
import { IEventService } from '@domain-command/services';
import { ISaleCommand } from '@domain/command/sale.command';
import {
  BranchDomainEntity,
  ISaleDomainEntity,
  ProductDomainEntity,
} from '@domain/entities';
import { SaleDomainEntity } from '@domain/entities/sale.domain-entity';
import { IEventModel } from '@domain/utils/models/interfaces';
import { UserIdValueObject } from '@domain/value-objects';
import {
  SaleDateValueObject,
  SaleTotalValueObject,
} from '@domain/value-objects/sales';
import { TypeNamesEnum } from '@enums';
import { BadRequestException } from '@nestjs/common';
import { SaleEnum } from '@shared/enums/sale.enum';
import { ProductsType } from '@types';
import { Observable, forkJoin, map, switchMap, tap, throwError } from 'rxjs';
import { v4 as uuid } from 'uuid';

export class RegisterSaleUseCase {
  constructor(
    private readonly eventService: IEventService,
    private readonly publisher: EventPublisher,
  ) {}

  execute(sale: ISaleCommand, discount?: number): Observable<SaleDomainEntity> {
    discount = discount || 100;
    const data = {
      id: uuid(),
      branchId: new UserIdValueObject(sale.branchId).valueOf(),
      number: 0,
      total: new SaleTotalValueObject(0).valueOf(),
      date: new SaleDateValueObject(new Date(Date.now())).valueOf(),
    };

    return this.eventService
      .findByEntityId(sale.branchId.valueOf(), [TypeNamesEnum.RegisteredBranch])
      .pipe(
        switchMap((event: IEventModel) => {
          if (!event)
            throw new BadRequestException('el id de la sucursal no existe');

          const user = event.eventBody as BranchDomainEntity;
          const branchId = user.id;
          const productsIds = sale.products.map((product) => product.id);
          const productsObservable: Observable<ProductDomainEntity>[] = [];
          const productsSale: ProductsType[] = [];

          return this.eventService.isExistArray(productsIds).pipe(
            switchMap((exist) => {
              if (!exist) {
                return throwError(
                  () =>
                    new BadRequestException(
                      'Los productos no existen en el sistema',
                    ),
                );
              } else {
                productsIds.forEach((id) => {
                  productsObservable.push(this.findByProductId(id));
                });

                return forkJoin(productsObservable).pipe(
                  switchMap((products) => {
                    let total = 0;
                    products.forEach((product) => {
                      if (product.branchId.valueOf() !== branchId.valueOf()) {
                        throw new BadRequestException(
                          `el producto ${product.name.valueOf()} no pertenece a la sucursal`,
                        );
                      }
                      product.quantity =
                        product.quantity.valueOf() -
                        sale.products.find((p) => p.id === product.id).quantity;
                      total +=
                        product.price.valueOf() *
                        (discount / 100) *
                        sale.products.find((p) => p.id === product.id).quantity;

                      if (product.quantity.valueOf() < 0) {
                        throw new BadRequestException(
                          `producto ${product.name.valueOf()} sin cantidad necesaria para la venta`,
                        );
                      }
                    });

                    products.forEach((product) => {
                      this.createEvent(
                        product,
                        discount == 100
                          ? TypeNamesEnum.RegisteredSellerSale
                          : TypeNamesEnum.RegisteredCustomerSale,
                      ).subscribe();

                      productsSale.push({
                        name: product.name.valueOf(),
                        price: product.price.valueOf() * (discount / 100),
                        quantity: sale.products.find((p) => p.id === product.id)
                          .quantity,
                      });
                    });

                    const eventData: SaleDomainEntity = {
                      id: data.id,
                      number: data.number,
                      branchId: data.branchId,
                      total: total,
                      date: new Date(Date.now()),
                      products: productsSale,
                      type:
                        discount == 100
                          ? SaleEnum.SellerSale
                          : SaleEnum.CustomerSale,
                    };

                    return this.eventService.calculateTotal().pipe(
                      switchMap((total) => {
                        eventData.number = total;
                        return this.createEvent(
                          eventData,
                          TypeNamesEnum.RegisteredSale,
                        ).pipe(
                          map((data: ISaleDomainEntity) => {
                            return data;
                          }),
                        );
                      }),
                    );
                  }),
                );
              }
            }),
          );
        }),
      );
  }

  private createEvent(
    data: ProductDomainEntity | SaleDomainEntity,
    types: TypeNamesEnum,
  ): Observable<ProductDomainEntity | SaleDomainEntity> {
    return this.eventService.create(data, types).pipe(
      tap((event) => {
        this.publisher.response = event;
        this.publisher.typeName = types;
        this.publisher.publish();
      }),
      map(() => data),
    );
  }

  private findByProductId(id: string): Observable<ProductDomainEntity> {
    return this.eventService
      .findByEntityId(id, [
        TypeNamesEnum.RegisteredProduct,
        TypeNamesEnum.RegisteredProductQuantity,
        TypeNamesEnum.RegisteredSellerSale,
        TypeNamesEnum.RegisteredCustomerSale,
      ])
      .pipe(
        map((event) => {
          const product = event.eventBody as ProductDomainEntity;
          return product;
        }),
      );
  }
}
