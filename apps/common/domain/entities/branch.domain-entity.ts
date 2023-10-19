import {
  BranchLocationValueObject,
  BranchNameValueObject,
} from '@domain/value-objects';
import { RolesUserEnum } from '@enums';
import { ApiProperty } from '@nestjs/swagger';
import { ProductDomainEntity } from './product.domain-entity';
import { UserDomainEntity } from './user.domain-entity';

export class BranchDomainEntity {
  @ApiProperty({
    description: 'id de la sucursal',
    example: 'fdca7a8e-9585-4890-9d57-84a88820ae52',
  })
  id?: string;
  @ApiProperty({
    description: 'Productos de la sucursal',
    example: [
      {
        name: 'Producto 1',
        category: 'Categoria 1',
        price: 100,
        description: 'Descripcion 1',
        quantity: 1,
        branchId: 'fdca7a8e-9585-4890-9d57-84a88820ae52',
      },
    ],
  })
  products: ProductDomainEntity[];
  @ApiProperty({
    description: 'Usuarios de la sucursal',
    example: [
      {
        name: 'Usuario 1',
        email: 'emailo@meail.com',
        password: 'Esnayo18',
        role: RolesUserEnum.employee,
        branchId: 'fdca7a8e-9585-4890-9d57-84a88820ae52',
      },
    ],
  })
  users: UserDomainEntity[];
  @ApiProperty({
    description: 'Nombre de la sucursal',
    example: 'Sucursal 1',
  })
  name: string;
  @ApiProperty({
    description: 'Ubicacion de la sucursal',
    example: 'Cali, Colombia',
  })
  location: string;
  constructor(name: string, location: string) {
    this.name = new BranchNameValueObject(name).valueOf();
    new BranchLocationValueObject({
      city: location.split(',')[0],
      country: location.split(',')[1],
    }).valueOf();
    this.location = location;
  }
}
