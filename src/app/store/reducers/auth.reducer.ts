import { createSlice } from '@reduxjs/toolkit';
import authApi from '../apis/auth.api';
import { AuthResponse } from '@/types/global';

const initialState: AuthResponse = {
	user: {
		_id: null,
		display_name: null,
		address: null,
		email: null,
		phone: null,
		picture: null,
		role: {
			role_cd: null,
			role_name: null,
			permissions: {
				allowAccessing: false,
				allowAdding: false,
				allowUpdating: false,
				allowDeleting: false
			}
		}
	},
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
