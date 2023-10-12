import { Module } from '@nestjs/common';
import { GameModule } from 'src/game/game.module';

import { CategoryController } from './category.controller';
import { CategoryRepository } from './category.repository';
import { CategoryService } from './category.service';

@Module({
    imports: [GameModule],
    providers: [CategoryService, CategoryRepository],
    controllers: [CategoryController],
})
export class CategoryModule {}
