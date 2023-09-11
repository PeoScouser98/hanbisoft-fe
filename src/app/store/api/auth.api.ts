import { createApi } from '@reduxjs/toolkit/query/react';
import { TAuthPayload, IUser } from '@/core/types/user';
import axiosBaseQuery from '../helper';

const authApi = createApi({
	reducerPath: 'authApi',
	tagTypes: ['Auth'],
	baseQuery: axiosBaseQuery(),
	endpoints: (build) => ({
		signin: build.mutation<Pick<TAuthPayload, 'user' | 'accessToken'>, Pick<IUser, 'email' | 'password'>>({
			query: (payload) => ({ url: '/signin', data: payload, method: 'POST' }),
			invalidatesTags: ['Auth']
		})
	})
});

export const { useSigninMutation } = authApi;

export default authApi;
