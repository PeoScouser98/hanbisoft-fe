import { createSlice } from '@reduxjs/toolkit';
import authApi from '../apis/auth.api';

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
			const { data } = payload;
			return {
				...data,
				authenticated: true
			};
		});
		build.addMatcher(authApi.endpoints.updateUserInfo.matchFulfilled, (state, { payload }) => {
			console.log(payload.data);
			return {
				...state,
				user: payload.data
			};
		});
	}
});

export const { signout } = authSlice.actions;
export default authSlice;
