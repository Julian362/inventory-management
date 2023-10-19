import { EmailService } from '@shared/services/email.service';
import { of } from 'rxjs';
import { EmailSendUseCase } from '../email-send.product.use-case';

describe('EmailSendProductUseCase', () => {
  let useCase: EmailSendUseCase;
  let emailService: EmailService;

  beforeEach(async () => {
    emailService = {
      sendEmail: jest.fn(),
    } as unknown as jest.Mocked<EmailService>;
    useCase = new EmailSendUseCase(emailService);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should be email send', () => {
    // Arrange
    const from = 'admin@admin.com';
    const to = ['superadmin@superadmin.com'];
    const subject = 'Nueva factura';
    const data = {
      number: 1,
      products: [
        {
          name: 'Product 1',
          quantity: 1,
          price: 100,
        },
        {
          name: 'Product 2',
          quantity: 1,
          price: 100,
        },
      ],
    } as any;
    jest.spyOn(emailService, 'sendEmail').mockImplementation(() => {
      return of(true);
    });
    // Act
    useCase.execute(from, to, subject, data).subscribe(() => {
      // Assert
      expect(emailService.sendEmail).toBeCalled();
    });
  });
});
