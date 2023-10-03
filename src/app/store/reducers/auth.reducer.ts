import { createSlice } from '@reduxjs/toolkit';
import authApi from '../apis/auth.api';
import { AuthResponse } from '@/types/global';

const initialState: AuthResponse = {
	user: null,
	accessToken: null,
	authenticated: false
};

const authSlice = createSlice({
	name: 'auth',
	initialState: initialState,
	reducers: {
		signout: () => {
			return initialState;
		}
	},
	extraReducers: (build) => {
		build.addMatcher(authApi.endpoints.signin.matchFulfilled, (_, { payload }) => {
			const { metadata } = payload;
			return {
				...metadata,
				authenticated: true
			};
		});
		build.addMatcher(authApi.endpoints.updateUserInfo.matchFulfilled, (state, { payload }) => {
			console.log(payload.metadata);
			return {
				...state,
				user: payload.metadata
			};
		});
	}
});

export const { signout } = authSlice.actions;
export default authSlice;
