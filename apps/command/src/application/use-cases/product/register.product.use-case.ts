import { EventPublisher } from '@domain-command/event';
import { IEventService } from '@domain-command/services';
import { IProductCommand } from '@domain/command';
import { ProductDomainEntity } from '@domain/entities';
import {
  ProductCategoryValueObject,
  ProductDescriptionValueObject,
  ProductIdValueObject,
  ProductNameValueObject,
  ProductPriceValueObject,
  ProductQuantityValueObject,
} from '@domain/value-objects';
import { TypeNamesEnum } from '@enums';
import { BadRequestException } from '@nestjs/common';
import { Observable, map, switchMap } from 'rxjs';
import { v4 as uuid } from 'uuid';

export class RegisterProductUseCase {
  constructor(
    private readonly eventService: IEventService,
    private readonly publisher: EventPublisher,
  ) {}

  execute(product: IProductCommand): Observable<ProductDomainEntity> {
    const data: ProductDomainEntity = {
      id: uuid(),
      name: new ProductNameValueObject(product.name).valueOf(),
      category: new ProductCategoryValueObject(product.category).valueOf(),
      price: new ProductPriceValueObject(product.price).valueOf(),
      description: new ProductDescriptionValueObject(
        product.description,
      ).valueOf(),
      quantity: new ProductQuantityValueObject(product.quantity).valueOf() || 0,
      branchId: new ProductIdValueObject(product.branchId).valueOf(),
    };

    return this.eventService
      .validateUnique(
        {
          name: 'name',
          value: data.name.valueOf(),
        },
        [TypeNamesEnum.RegisteredProduct],
        data.branchId.valueOf(),
      )
      .pipe(
        switchMap((isValid) => {
          if (!isValid) {
            return this.eventService
              .isExist(data.branchId.valueOf(), [
                TypeNamesEnum.RegisteredBranch,
              ])
              .pipe(
                switchMap((isExist) => {
                  if (isExist) {
                    return this.eventService
                      .create(data, TypeNamesEnum.RegisteredProduct)
                      .pipe(
                        map((event) => {
                          this.publisher.response = event;
                          this.publisher.typeName =
                            TypeNamesEnum.RegisteredProduct;
                          this.publisher.publish();
                          return data;
                        }),
                      );
                  } else {
                    throw new BadRequestException('La sucursal no existe');
                  }
                }),
              );
          } else {
            throw new BadRequestException('El nombre del producto ya existe');
          }
        }),
      );
  }
}
