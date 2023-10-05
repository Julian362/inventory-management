import { ProductPostgresService } from '@infrastructure-querie/persistence';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductService extends ProductPostgresService {}
