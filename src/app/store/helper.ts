import type { BaseQueryFn } from '@reduxjs/toolkit/query';

import axiosInstance from '../configs/axios.config';
import { AxiosRequestConfig, AxiosError, Method } from 'axios';

const axiosBaseQuery =
	(
		baseUrl = ''
	): BaseQueryFn<
		{
			url: string;
			method: Method;
			data?: AxiosRequestConfig['data'];
			params?: AxiosRequestConfig['params'];
			signal?: AxiosRequestConfig['signal'];
		},
		unknown,
		unknown
	> =>
	async ({ url: endpoint, method, data, params }) => {
		try {
			const url = baseUrl + endpoint;
			const response = await axiosInstance.request({ url, method, data, params });
			return { data: response };
		} catch (error) {
			const axiosError = error as AxiosError;
			return {
				error: {
					status: axiosError.response?.status,
					data: axiosError.response?.data || axiosError.message
				}
			};
		}
	};

export default axiosBaseQuery;
