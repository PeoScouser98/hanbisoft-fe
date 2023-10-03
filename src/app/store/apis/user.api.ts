import { createApi } from '@reduxjs/toolkit/query/react';
import { AxiosRequestConfig } from 'axios';
import axiosBaseQuery from '../helper';
import { HttpResponse, IUser } from '@/types/global';

const initialData = [
	{
		_id: crypto.randomUUID(),
		display_name: null,
		email: null,
		phone: null,
		role: null
	}
];

const userApi = createApi({
	reducerPath: 'userApi',
	tagTypes: ['Users'],
	baseQuery: axiosBaseQuery(),
	keepUnusedDataFor: 5 * 60,
	refetchOnMountOrArgChange: true,
	refetchOnReconnect: true,
	endpoints: (build) => ({
		getUsers: build.query<HttpResponse<Array<IUser>>, AxiosRequestConfig['params'] | void>({
			query: (params) => ({ url: '/users', method: 'GET', params: params }),
			providesTags: [{ type: 'Users', id: 'LIST' }]
		}),
		createUsers: build.mutation<HttpResponse<Array<IUser>>, Omit<IUser, 'id'>>({
			query: (payload) => ({ url: '/users/create-user', method: 'POST', data: payload }),
			invalidatesTags: (_, error) => (error ? [] : [{ type: 'Users', id: 'LIST' }])
		}),
		updateUsers: build.mutation<HttpResponse<IUser[]>, Partial<IUser>[]>({
			query: (payload) => ({ url: '/users/authorize', method: 'PATCH', data: payload }),
			invalidatesTags: (_, error) => (error ? [] : [{ type: 'Users', id: 'LIST' }])
		})
	})
});

export const { useGetUsersQuery, useCreateUsersMutation, useUpdateUsersMutation } = userApi;

export default userApi;
