import { FullNameType } from '@types';

export interface IUserCommand {
  id?: string;
  fullName: FullNameType;
  password: string;
  email: string;
  role: string;
  branchId: string;
}
