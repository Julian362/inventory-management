import { Controller, Get } from '@nestjs/common';
import { GamaService } from './gama.service';

@Controller()
export class GamaController {
  constructor(private readonly gamaService: GamaService) {}

  @Get()
  getHello(): string {
    return this.gamaService.getHello();
  }
}
