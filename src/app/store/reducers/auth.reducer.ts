import { createSlice } from '@reduxjs/toolkit';
import authApi from '../api/auth.api';

const initialState: Omit<AuthResponse, 'accessToken'> = {
	user: null,
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
			const { data } = payload;
			state.user = data.user;
			state.authenticated = true;
			return state;
		});
	}
});

export const { signout } = authSlice.actions;
export default authSlice;
