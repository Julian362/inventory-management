export interface IUserDTO {
  id?: string;
  name: {
    firstName: string;
    lastName: string;
  };
  password: string;
  email: string;
  role: string;
  branchId?: string;
}
