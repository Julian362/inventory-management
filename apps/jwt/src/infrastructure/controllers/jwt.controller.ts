import { ILoginResponse } from '@domain/utils/models';
import { LoginCommand } from '@infrastructure-jwt/command/login.command';
import { TokenCommand } from '@infrastructure-jwt/command/token.command';
import { Body, Controller, Post } from '@nestjs/common';
import { GetUserUseCase } from 'applications-jwt/use-cases/user';
import { RefreshTokenUseCase } from 'applications-jwt/use-cases/user/refresh.use-case';
import { Observable, map } from 'rxjs';

@Controller('api/v1')
export class JWTController {
  constructor(
    private readonly login: GetUserUseCase,
    private readonly refreshTokenUseCase: RefreshTokenUseCase,
  ) {}

  //User
  @Post('login')
  toGetUser(@Body() data: LoginCommand): Observable<ILoginResponse> {
    return this.login.execute(data.email, data.password);
  }

  @Post('refresh-token')
  refreshToken(@Body() refreshRequest: TokenCommand): Observable<{
    token: string;
  }> {
    return this.refreshTokenUseCase.execute(refreshRequest).pipe(
      map((token) => ({
        token,
      })),
    );
  }
}
