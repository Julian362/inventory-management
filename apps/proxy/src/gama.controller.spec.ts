import { Test, TestingModule } from '@nestjs/testing';
import { proxyController } from './proxy.controller';
import { proxyService } from './proxy.service';

describe('proxyController', () => {
  let proxyController: proxyController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [proxyController],
      providers: [proxyService],
    }).compile();

    proxyController = app.get<proxyController>(proxyController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(proxyController.getHello()).toBe('Hello World!');
    });
  });
});
