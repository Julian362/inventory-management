import { Module } from '@nestjs/common';
import { InventoryController } from './controllers/inventory.controller';
import { PersistenceModule } from './persistence/persistence.module';

@Module({
  imports: [PersistenceModule],
  controllers: [InventoryController],
  providers: [],
})
export class InventoryModule {}
