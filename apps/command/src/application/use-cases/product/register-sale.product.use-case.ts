import { EventPublisher } from '@domain-command/event';
import { IEventService } from '@domain-command/services';
import { IEventModel } from '@domain-command/utils/models/interfaces';
import { ISaleCommand } from '@domain/command/sale.command';
import { BranchDomainEntity, ProductDomainEntity } from '@domain/entities';
import { SaleDomainEntity } from '@domain/entities/sale.domain-entity';
import { UserIdValueObject } from '@domain/value-objects';
import {
  SaleDateValueObject,
  SaleTotalValueObject,
} from '@domain/value-objects/sales';
import { TypeNamesEnum } from '@enums';
import { BadRequestException } from '@nestjs/common';
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
                  productsObservable.push(
                    this.eventService
                      .findByEntityId(id, [
                        TypeNamesEnum.RegisteredProduct,
                        TypeNamesEnum.RegisteredProductQuantity,
                        TypeNamesEnum.RegisteredSellerSale,
                        TypeNamesEnum.RegisteredCustomerSale,
                      ])
                      .pipe(
                        map((event) => {
                          const product =
                            event.eventBody as ProductDomainEntity;
                          return product;
                        }),
                      ),
                  );
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
                        product.quantity.valueOf();

                      if (product.quantity.valueOf() < 0) {
                        throw new BadRequestException(
                          `producto ${product.name.valueOf()} sin cantidad necesaria para la venta`,
                        );
                      }
                    });

                    products.forEach((product) => {
                      this.eventService
                        .create(
                          product,
                          discount == 100
                            ? TypeNamesEnum.RegisteredSellerSale
                            : TypeNamesEnum.RegisteredCustomerSale,
                        )
                        .subscribe((event) => {
                          this.publisher.response = event;
                          this.publisher.typeName =
                            discount == 100
                              ? TypeNamesEnum.RegisteredSellerSale
                              : TypeNamesEnum.RegisteredCustomerSale;
                          this.publisher.publish();
                        });
                      productsSale.push({
                        name: product.name.valueOf(),
                        price: product.price.valueOf() * (discount / 100),
                        quantity: sale.products.find((p) => p.id === product.id)
                          .quantity,
                      });
                    });
                    this.eventService.calculateTotal().subscribe((total) => {
                      data.total = total;
                    });
                    const eventData: SaleDomainEntity = {
                      id: data.id,
                      number: data.number,
                      branchId: data.branchId,
                      total: total,
                      date: new Date(Date.now()),
                      products: productsSale,
                    };

                    return this.eventService
                      .create(eventData, TypeNamesEnum.RegisteredSale)
                      .pipe(
                        tap((event) => {
                          this.publisher.response = event;
                          this.publisher.typeName =
                            TypeNamesEnum.RegisteredSale;
                          this.publisher.publish();
                        }),
                        map(() => eventData),
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
