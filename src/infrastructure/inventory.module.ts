import { InventoryDelegate } from '@applications/delegate';
import { Module } from '@nestjs/common';
import { InventoryController } from './controllers';
import { PersistenceModule } from './persistence/persistence.module';
import {
  BranchService,
  EventService,
  ProductService,
  UserService,
} from './services';

@Module({
  imports: [PersistenceModule],
  controllers: [InventoryController],
  providers: [
    {
      provide: InventoryDelegate,
      useFactory: (
        productService: ProductService,
        branchService: BranchService,
        userService: UserService,
        eventService: EventService,
      ) =>
        new InventoryDelegate(
          productService,
          branchService,
          userService,
          eventService,
        ),
      inject: [ProductService, BranchService, UserService, EventService],
    },
  ],
})
export class InventoryModule {}
