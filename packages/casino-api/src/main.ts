import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { AllExceptionFilter } from './share/exception/AllException.filter';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.enableCors({
        origin: true,
        credentials: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        preflightContinue: false,
        optionsSuccessStatus: 204,
    });

    app.useGlobalFilters(new AllExceptionFilter());

    await app.listen(process.env.PORT || 3000);
}
bootstrap();
