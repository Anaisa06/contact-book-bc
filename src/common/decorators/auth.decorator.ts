import { applyDecorators, SetMetadata, UseGuards } from "@nestjs/common";
import { Role } from "src/common/enums/role.enum";
import { JwtAuthGuard } from "../guards/jwt.guard";
import { ApiBearerAuth } from "@nestjs/swagger";

export function PrivateService() {
    return applyDecorators(
        UseGuards( JwtAuthGuard),
        ApiBearerAuth('access-token'),
    )
}