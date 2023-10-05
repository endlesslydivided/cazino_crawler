import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { GameService } from 'src/game/game.service';

import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
    constructor(
        private categoryService: CategoryService,
        private gameService: GameService,
    ) {}

    @Get()
    async getManyCategories(
        @Query('skip') skip?: number,
        @Query('take') take?: number,
    ) {
        return this.categoryService.getManyCategories({
            skip,
            take,
            orderBy: {
                games: {
                    _count: Prisma.SortOrder.desc,
                },
            },
        });
    }

    @Get(':id')
    async getOneCategory(@Param('id') id: string) {
        return this.categoryService.getOneCategory({
            categoryWhereUniqueInput: { id },
        });
    }

    @Get(':id/games')
    async getManyGamesByCategoryId(
        @Param('id') id: string,
        @Query('skip', ParseIntPipe) skip: number,
        @Query('take', ParseIntPipe) take: number,
    ) {
        return this.gameService.getManyGames({
            where: { categoryId: id },
            skip,
            take,
        });
    }
}
