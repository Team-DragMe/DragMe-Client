import { AxiosResponse } from 'axios';
import { UseMutateFunction } from 'react-query';

export type MutateType<T> = UseMutateFunction<AxiosResponse<any, any>, unknown, T, unknown>;
