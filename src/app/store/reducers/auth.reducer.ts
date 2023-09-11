import { createSlice } from '@reduxjs/toolkit';
import authApi from '../api/auth.api';
import { TAuthPayload } from '@/core/types/user';

const initialState: TAuthPayload = {
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
		build.addMatcher(authApi.endpoints.signin.matchFulfilled, (state, { payload }) => {
			state.user = payload.user;
			state.accessToken = payload.accessToken;
			state.authenticated = true;
			return state;
		});
	}
});

export const { signout } = authSlice.actions;
export default authSlice;
