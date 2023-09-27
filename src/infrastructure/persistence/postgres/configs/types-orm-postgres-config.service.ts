import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { BranchPostgresEntity } from '../entities/branch.postgres-entity';
import { ProductPostgresEntity } from '../entities/product.postgres-entity';
import { UserPostgresEntity } from '../entities/user.postgres-entity';

@Injectable()
export class TypesOrmPostgresConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.configService.get<string>('DB_HOST'),
      port: this.configService.get<number>('DB_PORT'),
      username: this.configService.get<string>('DB_USER'),
      password: this.configService.get<string>('DB_PASSWORD'),
      database: this.configService.get<string>('DB_NAME'),
      entities: [
        ProductPostgresEntity,
        UserPostgresEntity,
        BranchPostgresEntity,
      ],
      synchronize: true,
      // logging: true,
    };
  }
}
