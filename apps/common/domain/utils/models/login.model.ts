import { JwtPayload } from './interfaces';

export interface ILoginResponse {
  token: string;
  data: JwtPayload;
}
