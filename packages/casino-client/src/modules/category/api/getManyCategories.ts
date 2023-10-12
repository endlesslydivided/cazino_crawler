import { baseFetch } from '@/share/api/baseFetch';
import { CATEGORY_API_URI } from '@/share/consts/api';

import { GetManyCategoriesConfig } from '../types/api';

export const getManyCategories = async (config: GetManyCategoriesConfig) => {
    try {
        const data = await baseFetch({
            url: CATEGORY_API_URI,
            ...config,
        });

        return data;
    } catch (error) {
        console.log(JSON.stringify(error));
    }
};
