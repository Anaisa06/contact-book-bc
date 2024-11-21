import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNumber } from "class-validator";

export class PaginationQueryDto {
    @ApiProperty({ name: 'page'})
    @Transform(({value}) => Number(value))
    @IsNumber()
    page: number;

    @ApiProperty({ name: 'limit'})
    @Transform(({value}) => Number(value))
    @IsNumber()
    limit: number;
}