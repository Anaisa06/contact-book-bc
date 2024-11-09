import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, IsStrongPassword } from "class-validator";
import { Role } from "src/common/enums/role.enum";


export class RegisterUserDto {
    @ApiProperty({ name: 'name', example: 'Lulú'})
    @IsString()
    name: string;

    @ApiProperty({ name: 'email', example: 'lulu@gmail.com'})
    @IsEmail()
    email: string;

    @ApiProperty({ name: 'password', example: 'MyPassword.123'})
    @IsStrongPassword()
    password: string;

    @ApiProperty({ name: 'phone number', example: '3129876543'})
    @IsNotEmpty()
    phoneNumber: string;
    
}