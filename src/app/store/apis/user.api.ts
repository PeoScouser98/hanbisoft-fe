import { createApi } from '@reduxjs/toolkit/query/react';
import { AxiosRequestConfig } from 'axios';
import axiosBaseQuery from '../helper';

const userApi = createApi({
	reducerPath: 'users',
	tagTypes: ['Users'],
	baseQuery: axiosBaseQuery(),
	keepUnusedDataFor: 5 * 60,
	refetchOnMountOrArgChange: true,
	refetchOnReconnect: true,
	endpoints: (build) => ({
		getUsers: build.query<Array<IUser>, AxiosRequestConfig['params']>({
			query: (params) => ({ url: '/users', method: 'GET', params: params }),
			providesTags: [{ type: 'Users', id: 'LIST' }],
			transformResponse: (response: HttpResponse<IUser>) => {
				if (!response || !Array.isArray(response.data)) return [];
				return response.data?.map((item) => {
					const { password, ...rest } = item;
					return rest;
				});
			}
		}),
		createUsers: build.mutation<HttpResponse<Array<IUser>>, Omit<IUser, 'id'>>({
			query: (payload) => ({ url: '/users/create-user', method: 'POST', data: payload }),
			invalidatesTags: (_, error) => (error ? [] : [{ type: 'Users', id: 'LIST' }])
		})
	})
});

export const { useGetUsersQuery, useCreateUsersMutation } = userApi;

export default userApi;
