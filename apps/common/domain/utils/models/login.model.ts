import { JwtPayload } from './interfaces/JwtPayload.interface';

export interface ILoginResponse {
  token: string;
  data: JwtPayload;
}
