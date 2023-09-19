import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import type { AxiosError, AxiosRequestConfig } from 'axios';
import axiosClient from '../configs/axios.config';

const axiosBaseQuery =
	(): BaseQueryFn<
		{
			url: string;
			method: AxiosRequestConfig['method'];
			data?: AxiosRequestConfig['data'];
			params?: AxiosRequestConfig['params'];
		},
		any,
		any
	> =>
	async ({ url, method, data, params }) => {
		try {
			const response = await axiosClient.request({ url, method, data, params });
			return { data: response };
		} catch (axiosError) {
			const err = axiosError as AxiosError;
			return {
				error: {
					status: err.response?.status,
					data: err.response?.data || err.message
					// error: err
				}
			};
		}
	};

export default axiosBaseQuery;
