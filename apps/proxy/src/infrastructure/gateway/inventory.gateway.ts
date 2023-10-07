/* eslint-disable @typescript-eslint/no-unused-vars */
import { ProductDomainEntity } from '@domain/entities';
import { SaleDomainEntity } from '@domain/entities/sale.domain-entity';
import { IEventModel } from '@domain/utils/models';
import { ProxyEnumEvents, QueueEnum, TypeNamesEnum } from '@enums';
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

  @SubscribeMessage(ProxyEnumEvents.EventInventory)
  handleIncomingInventory(client: Socket, product: ProductDomainEntity) {
    this.server
      .to(`branch.${product.branchId.valueOf()}`)
      .emit(ProxyEnumEvents.ProductChange, product);
  }

  @SubscribeMessage(ProxyEnumEvents.LeaveInventory)
  handleRoomLeave(client: Socket, id: string) {
    client.leave(`branch.${id}`);
  }

  //Product

  @RabbitRPC({
    exchange: EXCHANGE,
    routingKey: TypeNamesEnum.RegisteredProduct,
    queue: QueueEnum.ProductProxy,
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
    routingKey: TypeNamesEnum.ChangedProductQuantity,
    queue: QueueEnum.ProductUpdateProxy,
  })
  toUpdateQuantity(event: IEventModel) {
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
    queue: QueueEnum.SaleProxy,
  })
  registerSale(event: IEventModel) {
    const sale: SaleDomainEntity = event.eventBody as SaleDomainEntity;
    try {
      this.server
        .to(`branch.sale.${sale.branchId.valueOf()}`)
        .emit(ProxyEnumEvents.SaleCreate, sale);
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  }
}
