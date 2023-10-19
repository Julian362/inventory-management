import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class UpdateQuantityCommand {
  @ApiProperty({
    description: 'Cantidad del producto',
    example: 100,
  })
  @IsNotEmpty({ message: 'El id del producto es requerido' })
  @IsNumber({}, { message: 'El id del producto debe ser un número' })
  @IsPositive({ message: 'El id del producto debe ser mayor a 0' })
  quantity: number;
}
