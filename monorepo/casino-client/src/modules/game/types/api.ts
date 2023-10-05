import { BaseAxiosConfig } from '@/share/types/api';

export interface GetManyGamesByCategoryIdConfig extends BaseAxiosConfig {
    url: `/${string}`;
    params: {
        take: number;
        skip: number;
        where: {
            id: string;
        };
    };
}
