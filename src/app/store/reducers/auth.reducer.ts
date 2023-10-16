import { IUser } from '@/types/entities';
import { createSlice } from '@reduxjs/toolkit';
import authApi from '../apis/auth.api';

const initialState: { user: Omit<IUser, 'password'> | null; accessToken: string | null; authenticated: boolean } = {
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
				allow_adding: false,
				allow_updating: false,
				allow_deleting: false
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
