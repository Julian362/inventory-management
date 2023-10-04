import { Module } from '@nestjs/common';
import { GamaController } from './gama.controller';
import { GamaService } from './gama.service';

@Module({
  imports: [],
  controllers: [GamaController],
  providers: [GamaService],
})
export class GamaModule {}
