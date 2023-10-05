import { Controller, Get, Query } from '@nestjs/common';

import { GameService } from './game.service';

@Controller('game')
export class GameController {
    constructor(private gameService: GameService) {}

    @Get()
    async getManyGames(
        @Query('skip') skip?: number,
        @Query('take') take?: number,
    ) {
        return this.gameService.getManyGames({
            skip,
            take,
        });
    }
}
