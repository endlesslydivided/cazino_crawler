import { baseFetch } from '@/share/api/baseFetch';
import { CATEGORY_API_URI, PUBLIC_API_URI } from '@/share/consts/api';

import { GetManyGamesByCategoryIdConfig } from '../types/api';

export const getManyGamesByCategoryId = async (
    config: GetManyGamesByCategoryIdConfig,
) => {
    try {
        const { url, ...restConfig } = config;
        const data = await baseFetch({
            url: CATEGORY_API_URI + url,
            baseURL: PUBLIC_API_URI,
            ...restConfig,
        });

        return data;
    } catch (error) {
        throw error;
    }
};
