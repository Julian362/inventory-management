import {
  UserEmailValueObject,
  UserNameValueObject,
  UserPasswordValueObject,
  UserRolValueObject,
} from '@domain/value-objects';
import { RolesUserEnum } from '@enums';
import { ApiProperty } from '@nestjs/swagger';

export class UserDomainEntity {
  @ApiProperty({
    description: 'id del usuario',
    example: 'fdca7a8e-9585-4890-9d57-84a88820ae52',
  })
  id?: string;
  @ApiProperty({
    description: 'Nombre completo del usuario',
    example: 'Juan Perez',
  })
  fullName: string;
  @ApiProperty({
    description: 'Contraseña del usuario',
    example: 'Esnayo17',
  })
  password: string;
  @ApiProperty({
    description: 'Email del usuario',
    example: 'email@email.com',
  })
  email: string;
  @ApiProperty({
    description: 'Rol del usuario',
    example: RolesUserEnum.Admin,
  })
  role: string;
  @ApiProperty({
    description: 'Id de la sucursal del usuario',
    example: 'fdca7a8e-9585-4890-9d57-84a88820ae52',
  })
  branchId: string;

  constructor(data: UserDomainEntity) {
    const firstName = data.fullName.split(' ')[0];
    const lastName = data.fullName.split(' ')[1];
    new UserNameValueObject({
      firstName,
      lastName,
    }).valueOf();
    this.fullName = data.fullName;
    this.password = new UserPasswordValueObject(data.password).valueOf();
    this.email = new UserEmailValueObject(data.email).valueOf();
    this.role = new UserRolValueObject(data.role).valueOf();
  }
}
