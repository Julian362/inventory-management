import { UserPostgresService } from '@infrastructure-jwt/persistence';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService extends UserPostgresService {}
