import type { BaseQueryFn } from '@reduxjs/toolkit/query';

import axiosClient from '../configs/axios.config';
import { AxiosRequestConfig, AxiosError } from 'axios';

const axiosBaseQuery =
	(
		baseUrl = ''
	): BaseQueryFn<
		{
			url: string;
			method: AxiosRequestConfig['method'];
			data?: AxiosRequestConfig['data'];
			params?: AxiosRequestConfig['params'];
		},
		unknown,
		unknown
	> =>
	async ({ url: endpoint, method, data, params }) => {
		try {
			const url = baseUrl + endpoint;
			const response = await axiosClient.request({ url, method, data, params });
			return { data: response };
		} catch (axiosError) {
			const err = axiosError as AxiosError;
			return {
				error: {
					status: err.response?.status,
					data: err.response?.data || err.message
				}
			};
		}
	};

export default axiosBaseQuery;
