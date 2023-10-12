import { Category } from '@/modules/category/types/model';

export interface Game {
    id: string;
    iconUrl: string;
    name: string;
    category?: Category;
    categoryId: string;
}
