import axios, { AxiosRequestConfig } from 'axios';

import { InternalServerErrorException } from '../exceptions/internalServerError.exception';
import { API_URI } from '../consts/api';

export const baseFetch = async (config: AxiosRequestConfig) => {
    try {


        const { url, params, headers, method,baseURL } = config;

        console.log((API_URI ? API_URI : ' ' ) + url);

        const response = await axios({
            url,
            method,
            headers,
            params,
            baseURL: baseURL || API_URI,
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
