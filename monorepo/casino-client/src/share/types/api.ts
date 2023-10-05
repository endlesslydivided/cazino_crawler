import { AxiosRequestConfig } from 'axios';

export interface BaseAxiosConfig
    extends Pick<AxiosRequestConfig, 'method' | 'headers'> {}
