import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InterceptorsModule } from './common/interceptors/interceptors.module';
import { UsersModule } from './users/users.module';
import { ContactsModule } from './contacts/contacts.module';
import { AuthModule } from './auth/auth.module';
import DatabaseConfig from './common/config/db.config';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: DatabaseConfig,
    }),
    InterceptorsModule,
    UsersModule,
    ContactsModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
