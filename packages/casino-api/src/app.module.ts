import { Module } from '@nestjs/common';

import { CategoryModule } from './category/category.module';
import { GameModule } from './game/game.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
    imports: [CategoryModule, PrismaModule, GameModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
