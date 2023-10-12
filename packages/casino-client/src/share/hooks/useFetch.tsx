import { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { MessageType } from '../consts/errorMessages';
import { BaseException } from '../exceptions/base.exception';

type UseLoadingParams = {
    fetch: (...args: any[]) => Promise<any>;
    errorCallback?: (error: BaseException) => void;
    params?: any;
    config: AxiosRequestConfig;
};

type Filters = {
    skip: number;
    take: number;
};

export const initialFiltersState: Filters = {
    skip: 0,
    take: 12,
};

const useFetch = ({
    fetch,
    errorCallback,
    params,
    config,
}: UseLoadingParams) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<any[] | any>([]);

    const [filters, setFilters] = useState<Filters>(initialFiltersState);
    const [count, setCount] = useState<number>(0);

    const initFetch = () => {
        setLoading(true);
        fetch({ params: { ...filters, ...params }, ...config })
            .then((result) => {
                setData([...data, ...result.rows]);
                setCount(result?.count ?? 0);
            })
            .catch((error) => {
                if (errorCallback) {
                    errorCallback(error);
                }
                toast(error.reason ?? MessageType.SERVER_ERROR, {
                    autoClose: 5000,
                    type: 'error',
                });
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        initFetch();
    }, [filters]);

    return {
        loading,
        data,
        setData,
        filters,
        setFilters,
        count,
        initFetch,
    };
};

export default useFetch;
