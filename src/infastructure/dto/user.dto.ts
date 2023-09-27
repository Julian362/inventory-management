import { IUserDTO } from '@domain/dto';

export class UserDTO implements IUserDTO {
  id?: string;
  name: string;
  password: string;
  email: string;
  role: string;
}
