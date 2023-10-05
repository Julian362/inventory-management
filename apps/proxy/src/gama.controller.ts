import { Controller, Get } from '@nestjs/common';
import { proxyService } from './proxy.service';

@Controller()
export class proxyController {
  constructor(private readonly proxyService: proxyService) {}

  @Get()
  getHello(): string {
    return this.proxyService.getHello();
  }
}
