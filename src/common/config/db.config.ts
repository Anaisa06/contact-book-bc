import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import {  TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";

@Injectable()
export default class DatabaseConfig implements TypeOrmOptionsFactory {
    constructor(
        private configService: ConfigService
    ) {}

    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: 'postgres',
            host: this.configService.get<string>('DB_HOST'),
            port: this.configService.get<number>('DB_PORT'),
            username: this.configService.get<string>('DB_USER'),
            password: this.configService.get<string>('DB_PASSWORD'),
            database: this.configService.get<string>('DB_NAME'),
            // url: this.configService.get<string>('DB_URL'),
            autoLoadEntities: true,
            entities: [],
            synchronize: true,
          };
    }
}