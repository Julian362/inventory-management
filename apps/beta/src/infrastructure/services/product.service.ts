import { ProductPostgresService } from '@beta-infrastructure/persistence/database/postgres';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductService extends ProductPostgresService {}
