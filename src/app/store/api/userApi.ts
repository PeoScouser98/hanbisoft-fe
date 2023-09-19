import { IUser } from '@/type';
import { createApi } from '@reduxjs/toolkit/query/react';
import { AxiosRequestConfig } from 'axios';
import axiosBaseQuery from '../helper';

const userApi = createApi({
	reducerPath: 'users',
	tagTypes: ['Users'],
	baseQuery: axiosBaseQuery(),
	endpoints: (build) => ({
		getUsers: build.query<IUser[], AxiosRequestConfig['params']>({
			query: (params) => ({ url: '/users', method: 'GET', params: params }),
			providesTags: [{ type: 'Users', id: 'LIST' }],
			transformResponse: (response) => {
				if (!response || !Array.isArray(response.data)) return [];
				const transformedData = response.data?.map((item) => {
					const { password, ...rest } = item;
					return rest;
				});
				return transformedData;
			}
		}),
		createUsers: build.mutation<Array<IUser>, Omit<IUser, 'id'>>({
			query: (payload) => ({ url: '/users', method: 'POST', data: payload }),
			invalidatesTags: (_, error) => (error ? [] : [{ type: 'Users', id: 'LIST' }])
		})
	})
});

export const { useGetUsersQuery, useCreateUsersMutation } = userApi;

export default userApi;
