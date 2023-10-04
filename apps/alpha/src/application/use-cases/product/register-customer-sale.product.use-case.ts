// import { ProductDomainEntity } from '@domain/entities';
// import { EventPublisher, IStoreEvent } from '@domain/event/publishers';
// import {
//   ProductIdValueObject,
//   ProductQuantityValueObject,
// } from '@domain/value-objects';
// import { Observable } from 'rxjs';

// export class RegisterCustomerSaleUseCase {
//   constructor(
//     private readonly eventStore: IStoreEvent,
//     private readonly publisher: EventPublisher,
//   ) {}

//   execute(id: string, quantity: number): Observable<ProductDomainEntity> {
//     const data = {
//       id: new ProductIdValueObject(id),
//       quantity: new ProductQuantityValueObject(quantity),
//     };
//     // return from(this.eventStore.emitCreate(data, 'RegisteredCustomerSale'));

//     // return this.productService.getProductById(data.id.valueOf()).pipe(
//     //   switchMap((product: ProductDomainEntity) => {
//     //     product.quantity = product.quantity.valueOf() - data.quantity.valueOf();
//     //     return iif(
//     //       () => product.quantity.valueOf() < 0,
//     //       throwError(
//     //         () =>
//     //           new BadRequestException(
//     //             'producto sin cantidad necesaria para la venta',
//     //           ),
//     //       ),
//     //       this.productService
//     //         .modifyQuantity(data.id.valueOf(), product.quantity.valueOf())
//     //         .pipe(
//     //           mergeMap(() => {
//     //             return this.eventStore
//     //               .emitCreate(
//     //                 product,
//     //                 InventoryEventPublisherEnum.RegisteredCustomerSale,
//     //               )
//     //               .pipe(
//     //                 tap((event) => {
//     //                   this.publisher.response = event;
//     //                   this.publisher.typeName =
//     //                     InventoryEventPublisherEnum.RegisteredCustomerSale;
//     //                   this.publisher.publish();
//     //                 }),
//     //                 map(() => product),
//     //               );
//     //           }),
//     //         ),
//     //     );
//     //   }),
//     // );
//   }
// }
