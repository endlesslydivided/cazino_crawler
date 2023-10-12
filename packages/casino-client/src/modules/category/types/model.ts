import { Game } from '@/modules/game/types/model';

export interface Category {
    id: string;
    name: string;
    slug: string;
    games: Game[];
    _count: {
        games: number;
    };
}
