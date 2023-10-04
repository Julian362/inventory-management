import { Test, TestingModule } from '@nestjs/testing';
import { GamaController } from './gama.controller';
import { GamaService } from './gama.service';

describe('GamaController', () => {
  let gamaController: GamaController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [GamaController],
      providers: [GamaService],
    }).compile();

    gamaController = app.get<GamaController>(GamaController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(gamaController.getHello()).toBe('Hello World!');
    });
  });
});
