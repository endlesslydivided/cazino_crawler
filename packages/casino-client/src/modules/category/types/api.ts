import { BaseAxiosConfig } from '@/share/types/api';

export interface GetManyCategoriesConfig extends BaseAxiosConfig {
    params?: {
        take: number;
        skip: number;
    };
}
