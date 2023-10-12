import { Module } from '@nestjs/common';

import { GameController } from './game.controller';
import { GameRepository } from './game.repository';
import { GameService } from './game.service';

@Module({
    providers: [GameService, GameRepository],
    controllers: [GameController],
    exports: [GameService],
})
export class GameModule {}
