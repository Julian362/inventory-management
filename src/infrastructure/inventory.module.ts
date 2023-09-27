import { Module } from '@nestjs/common';
import { InventoryDelegate } from 'src/application/delegate/inventory.delegate';
import { InventoryController } from './controllers/inventory.controller';
import { PersistenceModule } from './persistence/persistence.module';
import { BranchService, ProductService, UserService } from './services';
import { EventService } from './services/event.service';

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
      ) => {
        return new InventoryDelegate(
          productService,
          branchService,
          userService,
          eventService,
        );
      },
    },
  ],
})
export class InventoryModule {}
