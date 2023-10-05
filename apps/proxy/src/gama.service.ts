import { Injectable } from '@nestjs/common';

@Injectable()
export class proxyService {
  getHello(): string {
    return 'Hello World!';
  }
}
