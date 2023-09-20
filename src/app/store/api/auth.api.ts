import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from '../helper';

const authApi = createApi({
	reducerPath: 'authApi',
	tagTypes: ['Auth'],
	baseQuery: axiosBaseQuery(),
	endpoints: (build) => ({
		signin: build.mutation<HttpResponse<AuthResponse>, Pick<IUser, 'email' | 'password'>>({
			query: (payload) => ({ url: '/signin', data: payload, method: 'POST' }),
			invalidatesTags: ['Auth']
		})
	})
});

export const { useSigninMutation } = authApi;

export default authApi;
