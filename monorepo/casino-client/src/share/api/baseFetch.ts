import axios, { AxiosRequestConfig } from 'axios';

import { InternalServerErrorException } from '../exceptions/internalServerError.exception';

export const baseFetch = async (config: AxiosRequestConfig) => {
    try {
        const { url, params, headers, method } = config;
        const response = await axios({
            url,
            method,
            headers,
            params,
            baseURL: process.env.NEXT_PUBLIC_API_URI,
        });

        if (response.status !== 200) {
            throw response.statusText;
        }

        return response.data;
    } catch (error: any) {
        throw new InternalServerErrorException({
            message: 'Some error occured on server',
            reason: error.statusText,
        });
    }
};
