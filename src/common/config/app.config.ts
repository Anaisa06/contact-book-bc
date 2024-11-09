import { INestApplication, ValidationPipe } from "@nestjs/common";

export const AppConfig = (app: INestApplication<any>) => {
    app.setGlobalPrefix('api');
    // app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalPipes(new ValidationPipe());
}