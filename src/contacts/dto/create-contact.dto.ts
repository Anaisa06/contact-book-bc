import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { ILocation } from "src/auth/interfaces/location.interface";
import { Role } from "src/common/enums/role.enum";

export class CreateContactDto {

    @IsString()
    name: string;

    @IsString()
    email: string;

    @IsString()
    phoneNumber: string;

    @IsOptional()
    @IsNotEmpty()
    location?: ILocation;

    @IsOptional()
    @IsEnum(Role)
    role?: Role;

    @IsOptional()
    @IsString()
    imageUri?: string;

    @IsNumber()
    userId: number;
}
