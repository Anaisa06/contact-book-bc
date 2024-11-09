import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategy/jwt.strategy';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';


@Module({
  imports: [TypeOrmModule.forFeature([User]), UsersModule,
  JwtModule.registerAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      secret: configService.get<string>('JWT_SECRET'),
      signOptions: { expiresIn: '12h' },
    }),
    inject: [ConfigService]
  }),
    PassportModule,],
  controllers: [AuthController],
  providers: [AuthService, JwtAuthGuard, JwtStrategy]
})
export class AuthModule { }
