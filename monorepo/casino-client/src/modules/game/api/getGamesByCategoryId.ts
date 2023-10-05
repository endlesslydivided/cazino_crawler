import { baseFetch } from '@/share/api/baseFetch';
import { CATEGORY_API_URI } from '@/share/consts/api';

import { GetManyGamesByCategoryIdConfig } from '../types/api';

export const getManyGamesByCategoryId = async (
    config: GetManyGamesByCategoryIdConfig,
) => {
    try {
        const { url, ...restConfig } = config;
        const data = await baseFetch({
            url: CATEGORY_API_URI + url,
            ...restConfig,
        });

        return data;
    } catch (error) {
        throw error;
    }
};
