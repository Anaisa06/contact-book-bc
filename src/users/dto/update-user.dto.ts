import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
    @ApiPropertyOptional({ name: 'onboarding', example: true})
    @IsOptional()
    onboarding: boolean;

    @ApiPropertyOptional({ name: 'syncronization', example: true})
    @IsOptional()
    syncronization: boolean;
}
