import { ApiProperty } from '@nestjs/swagger';

export class TypeLoginResponse {
  @ApiProperty({
    description: 'Token de acceso',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJicmFuY2hJZCI6ImZkY2E3YThlLTk1ODUtNDg5MC05ZDU3LTg0YTg4ODIwYWU1MiIsInVzZXJJZCI6ImZkY2E3YThlLTk1ODUtNDg5MC05ZDU3LTg0YTg4ODIwYWU1MiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTYyNTY2NjQ5NiwiZXhwIjoxNjI1NjY2NTk2fQ.6y6J2Z8pQb4ZDy6m4Z2LbJ3MqZu3hZ7Z4Q3vU8Yf2d8',
  })
  token: string;
  @ApiProperty({
    description: 'Datos del usuario',
    example: {
      userId: 'fdca7a8e-9585-4890-9d57-84a88820ae52',
      role: 'admin',
      branchId: 'fdca7a8e-9585-4890-9d57-84a88820ae52',
    },
  })
  data: {
    userId: string;
    role: string;
    branchId: string;
  };
}
