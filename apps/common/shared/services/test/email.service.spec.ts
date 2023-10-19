import { Test, TestingModule } from '@nestjs/testing';
import { Resend } from 'resend';
import { EmailService } from '../email.service';
describe('EmailService', () => {
  let service: EmailService;
  let resend: Resend;

  beforeEach(async () => {
    process.env.API_EMAIL = 'test_api_key';
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmailService,
        {
          provide: Resend,
          useValue: {
            emails: {
              send: jest.fn(),
            },
          },
        },
      ],
    }).compile();
    resend = module.get<Resend>(Resend);
    service = module.get<EmailService>(EmailService);
  });
  afterAll(() => {
    delete process.env.API_EMAIL;
  });

  it('puede ser definido', () => {
    expect(service).toBeDefined();
  });

  it('puede enviar un email', () => {
    // Arrange
    const from = 'email@email.com';
    const to = ['example@example.com'];
    const subject = 'subject';
    const html = 'html';
    const send = jest.fn();
    // Act
    resend.emails.send = send;
    const email = service.sendEmail(from, to, subject, html);
    // Assert
    expect(email).toBeDefined();
  });
});
