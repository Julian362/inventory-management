import { ILoginResponse } from '@domain/utils/models';
import { LoginCommand } from '@infrastructure-jwt/command/login.command';
import { TokenCommand } from '@infrastructure-jwt/command/token.command';
import { Body, Controller, Post } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { GetUserUseCase } from '../../application/use-cases/user/get.user.use-case';
import { RefreshTokenUseCase } from '../../application/use-cases/user/refresh.use-case';

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
