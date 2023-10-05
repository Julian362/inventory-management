import { Module } from '@nestjs/common';
import { proxyController } from './proxy.controller';
import { proxyService } from './proxy.service';

@Module({
  imports: [],
  controllers: [proxyController],
  providers: [proxyService],
})
export class proxyModule {}
