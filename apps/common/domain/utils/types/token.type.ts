import { ApiProperty } from '@nestjs/swagger';

export class TokenType {
  @ApiProperty({
    description: 'Token de acceso',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJicmFuY2hJZCI6ImZkY2E3YThlLTk1ODUtNDg5MC05ZDU3LTg0YTg4ODIwYWU1MiIsInVzZXJJZCI6ImZkY2E3YThlLTk1ODUtNDg5MC05ZDU3LTg0YTg4ODIwYWU1MiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTYyNTY2NjQ5NiwiZXhwIjoxNjI1NjY2NTk2fQ.6y6J2Z8pQb4ZDy6m4Z2LbJ3MqZu3hZ7Z4Q3vU8Yf2d8',
  })
  token: string;
}
