import { UserPostgresService } from '@infrastructure-querie/persistence';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService extends UserPostgresService {}
