import { Injectable } from '@nestjs/common';
import { Game, Prisma } from '@prisma/client';

import { GameRepository } from './game.repository';

@Injectable()
export class GameService {
    constructor(private gameRepository: GameRepository) {}

    async getOneGame(
        gameWhereUniqueInput: Prisma.GameWhereUniqueInput,
    ): Promise<Game | null> {
        return this.gameRepository.game(gameWhereUniqueInput);
    }

    async getManyGames(params: {
        skip?: number;
        take?: number;
        where?: Prisma.GameWhereInput;
    }): Promise<{ rows: Game[]; count: number }> {
        return this.gameRepository.games(params);
    }
}
