import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class UpdateQuantityCommand {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  quantity: number;
}
