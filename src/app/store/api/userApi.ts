import { createApi } from '@reduxjs/toolkit/dist/query/react';
import axiosBaseQuery from '../helper';
import { IUser } from '@/core/types/user';
import { AxiosRequestConfig } from 'axios';

const userApi = createApi({
	reducerPath: 'users',
	tagTypes: ['Users'],
	baseQuery: axiosBaseQuery(),
	endpoints: (build) => ({
		getUsers: build.query<IUser[], AxiosRequestConfig['params'] | void>({
			query: (params = {}) => ({ url: '/users', method: 'GET', params: params }),
			providesTags: [{ type: 'Users', id: 'LIST' }]
		}),
		createUsers: build.mutation<Array<IUser>, Omit<IUser, 'id'>>({
			query: (payload) => ({ url: '/users', method: 'POST', data: payload }),
			invalidatesTags: (_, error) => (error ? [] : [{ type: 'Users', id: 'LIST' }])
		})
	})
});

export const { useGetUsersQuery, useCreateUsersMutation } = userApi;

export default userApi;
