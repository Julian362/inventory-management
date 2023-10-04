import { Injectable } from '@nestjs/common';

@Injectable()
export class GamaService {
  getHello(): string {
    return 'Hello World!';
  }
}
