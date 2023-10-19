import {
  GetUserUseCase,
  RefreshTokenUseCase,
  RegisterUserUseCase,
} from '@applications-jwt/use-cases';
import { JWTService } from '@infrastructure-jwt/utils/jtw.service';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JWTController } from './controllers';
import { JWTSubscriber } from './messaging/subscribers/jwt.subscriber';
import { PersistenceModule } from './persistence';
import { UserService } from './services';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secret',
      signOptions: { expiresIn: '2h' },
    }),
    PersistenceModule,
  ],
  controllers: [JWTSubscriber, JWTController],
  providers: [
    JWTSubscriber,
    JWTService,
    {
      provide: GetUserUseCase,
      useFactory: (service: UserService, jwt: JWTService) => {
        return new GetUserUseCase(service, jwt);
      },
      inject: [UserService, JWTService],
    },
    {
      provide: RegisterUserUseCase,
      useFactory: (service: UserService) => {
        return new RegisterUserUseCase(service);
      },
      inject: [UserService],
    },
    {
      provide: RefreshTokenUseCase,
      useFactory: (jwt: JWTService, service: UserService) => {
        return new RefreshTokenUseCase(jwt, service);
      },
      inject: [JWTService, UserService],
    },
  ],
  exports: [],
})
export class InfrastructureModule {}
