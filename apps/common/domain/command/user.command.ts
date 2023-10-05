import { FullNameType } from '@types';

export interface IUserCommand {
  id?: string;
  name: FullNameType;
  password: string;
  email: string;
  role: string;
  branchId: string;
}
