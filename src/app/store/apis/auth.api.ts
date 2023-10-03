import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from '../helper';
import { AxiosRequestConfig } from 'axios';
import { AuthResponse, HttpResponse, IUser } from '@/types/global';

const authApi = createApi({
	reducerPath: 'authApi',
	tagTypes: ['Auth', 'Info', 'Users'],
	baseQuery: axiosBaseQuery(),
	endpoints: (build) => ({
		signin: build.mutation<HttpResponse<AuthResponse>, Pick<IUser, 'email' | 'password'>>({
			query: (payload) => ({ url: '/auth/signin', data: payload, method: 'POST' }),
			invalidatesTags: ['Auth']
		}),
		getUserInfo: build.query<Partial<IUser>, void>({
			query: () => ({ url: '/auth/info', method: 'GET' }),
			providesTags: [{ type: 'Info', id: 'INFO' }],
			transformResponse: (response: HttpResponse<Partial<IUser>>): Partial<IUser> => {
				return response?.metadata;
			}
		}),
		updateUserInfo: build.mutation<HttpResponse<Omit<IUser, 'password'>>, Partial<IUser>>({
			query: (payload) => ({ url: '/auth/update-info', method: 'PATCH', data: payload }),
			invalidatesTags: (_, error) => (error ? [] : ['Auth', 'Info'])
		}),
		changePassword: build.mutation<
			HttpResponse<Omit<IUser, 'password'>>,
			{ currentPassword: string; newPassword: string }
		>({
			query: (payload) => ({ url: '/auth/change-password', method: 'PATCH', data: payload })
		})
	})
});

export const { useSigninMutation, useGetUserInfoQuery, useUpdateUserInfoMutation, useChangePasswordMutation } = authApi;

export default authApi;
