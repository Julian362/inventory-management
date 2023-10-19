import { ILoginResponse } from '@domain/utils/models';
import { TypeLoginResponse } from '@domain/utils/types/login.type';
import { TokenType } from '@domain/utils/types/token.type';
import { LoginCommand } from '@infrastructure-jwt/command/login.command';
import { TokenCommand } from '@infrastructure-jwt/command/token.command';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Observable, map } from 'rxjs';
import { GetUserUseCase } from '../../application/use-cases/user/get.user.use-case';
import { RefreshTokenUseCase } from '../../application/use-cases/user/refresh.use-case';

@ApiTags('JWT')
@Controller('api/v1')
export class JWTController {
  constructor(
    private readonly login: GetUserUseCase,
    private readonly refreshTokenUseCase: RefreshTokenUseCase,
  ) {}

  //User
  @ApiOperation({ summary: 'Login' })
  @ApiResponse({ status: 200, description: 'Login', type: TypeLoginResponse })
  @Post('login')
  toGetUser(@Body() data: LoginCommand): Observable<ILoginResponse> {
    return this.login.execute(data.email, data.password);
  }

  @ApiOperation({ summary: 'Refresh Token' })
  @ApiResponse({
    status: 200,
    description: 'Refresh Token',
    type: TokenType,
  })
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
