import { Injectable } from '@nestjs/common';
import { ProductPostgresService } from '../persistence/postgres/services/product-postgres.service';

@Injectable()
export class ProductService extends ProductPostgresService {}
