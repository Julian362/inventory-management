/* eslint-disable @typescript-eslint/no-unused-vars */
import { IEventModel } from '@domain-command/utils/models/interfaces';
import { ProductDomainEntity } from '@domain/entities';
import { SaleDomainEntity } from '@domain/entities/sale.domain-entity';
import { ProxyEnumEvents, TypeNamesEnum } from '@enums';
import { RabbitRPC, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { ProductCommand } from '@infrastructure-command/command';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { EXCHANGE } from '@shared/const';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(81, {
  cors: {
    origin: '*',
  },
})
export class InventoryGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  afterInit(server: any) {
    console.log('socket.io server initialized');
  }
  handleConnection(client: any, ...args: any[]) {
    console.log('client connected');
  }
  handleDisconnect(client: any) {
    console.log('client disconnected');
  }

  @WebSocketServer() server: Server;

  @SubscribeMessage(ProxyEnumEvents.JoinInventory)
  handleJoinInventory(client: Socket, branch: string) {
    client.join(`branch.${branch}`);
  }

  @SubscribeMessage(ProxyEnumEvents.JoinSale)
  handleJoinSale(client: Socket, branch: string) {
    client.join(`branch.sale.${branch}`);
  }

  @SubscribeMessage('event.inventory')
  handleIncomingInventory(client: Socket, product: ProductDomainEntity) {
    this.server
      .to(`branch.${product.branchId.valueOf()}`)
      .emit('product.change', product);
  }

  @SubscribeMessage(ProxyEnumEvents.LeaveInventory)
  handleRoomLeave(client: Socket, id: string) {
    client.leave(`branch.${id}`);
  }

  //Product

  @RabbitRPC({
    exchange: EXCHANGE,
    routingKey: TypeNamesEnum.RegisteredProduct,
    queue: 'product_queue_proxy',
  })
  toCreateProduct(data: object) {
    const event: IEventModel = data as IEventModel;
    const product: ProductCommand = event.eventBody as ProductCommand;
    try {
      this.server
        .to(`branch.${product.branchId}`)
        .emit(ProxyEnumEvents.ProductCreate, product);
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  }

  @RabbitSubscribe({
    exchange: EXCHANGE,
    routingKey: 'registered.product.quantity.#',
    queue: 'product_update_queue_proxy',
  })
  toUpdateQuantity(data: object) {
    console.log('actualizando cantidad');
    const event: IEventModel = data as IEventModel;
    const product: ProductDomainEntity = event.eventBody as ProductDomainEntity;
    try {
      this.server
        .to(`branch.${product.branchId.valueOf()}`)
        .emit(ProxyEnumEvents.ProductChange, product);
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  }

  //Branch

  //Sale

  @RabbitRPC({
    exchange: EXCHANGE,
    routingKey: TypeNamesEnum.RegisteredSale,
    queue: 'sale_queue_proxy',
  })
  registerSale(data: object) {
    console.log('creando venta');
    const event: IEventModel = data as IEventModel;
    const sale: SaleDomainEntity = event.eventBody as SaleDomainEntity;
    try {
      console.log(sale);
      this.server
        .to(`branch.sale.${sale.branchId.valueOf()}`)
        .emit(ProxyEnumEvents.SaleCreate, sale);
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  }
}
