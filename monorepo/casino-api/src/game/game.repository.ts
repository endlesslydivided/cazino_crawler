import { Injectable } from '@nestjs/common';
import { Game, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GameRepository {
    constructor(private prisma: PrismaService) {}

    async game(
        gameWhereUniqueInput: Prisma.GameWhereUniqueInput,
    ): Promise<Game | null> {
        return this.prisma.game.findUnique({
            where: gameWhereUniqueInput,
        });
    }

    async games(params: {
        skip?: number;
        take?: number;
        where?: Prisma.GameWhereInput;
    }): Promise<{ rows: Game[]; count: number }> {
        const { skip, take, where } = params;
        const [games, count] = await this.prisma.$transaction([
            this.prisma.game.findMany({
                skip,
                take,
                where,
            }),
            this.prisma.game.count({ where }),
        ]);

        return {
            rows: games,
            count,
        };
    }
}
