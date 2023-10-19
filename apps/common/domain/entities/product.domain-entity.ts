import {
  BranchIdValueObject,
  ProductCategoryValueObject,
  ProductDescriptionValueObject,
  ProductNameValueObject,
  ProductPriceValueObject,
  ProductQuantityValueObject,
} from '@domain/value-objects';
import { ProductCategory } from '@enums';
import { ApiProperty } from '@nestjs/swagger';

export class ProductDomainEntity {
  @ApiProperty({
    description: 'id del producto',
    example: 'fdca7a8e-9585-4890-9d57-84a88820ae52',
  })
  id?: string;
  @ApiProperty({
    description: 'Nombre del producto',
    example: 'Producto 1',
  })
  name: string;
  @ApiProperty({
    description: 'Categoría del producto',
    example: ProductCategory.ConstructionHardware,
  })
  category: string;
  @ApiProperty({
    description: 'Precio del producto',
    example: 100,
  })
  price: number;
  @ApiProperty({
    description: 'Descripción del producto',
    example: 'Descripción 1',
  })
  description: string;
  @ApiProperty({
    description: 'Cantidad del producto',
    example: 1,
  })
  quantity: number;
  @ApiProperty({
    description: 'Id de la sucursal',
    example: 'fdca7a8e-9585-4890-9d57-84a88820ae52',
  })
  branchId: string;

  constructor(data: ProductDomainEntity) {
    this.name = new ProductNameValueObject(data.name).valueOf();
    this.category = new ProductCategoryValueObject(data.category).valueOf();
    this.price = new ProductPriceValueObject(data.price).valueOf();
    this.description = new ProductDescriptionValueObject(
      data.description,
    ).valueOf();
    this.quantity = new ProductQuantityValueObject(data.quantity).valueOf();
    this.branchId = new BranchIdValueObject(data.branchId).valueOf();
  }
}
