import { UserPostgresService } from '@beta-infrastructure/persistence/database/postgres';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService extends UserPostgresService {}
