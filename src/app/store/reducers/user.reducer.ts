import { createSlice } from '@reduxjs/toolkit';
import userApi from '../apis/user.api';

const initialState = { message: null, metadata: [] };

const userSlice = createSlice({
	name: 'users',
	reducers: {},
	initialState,
	extraReducers: (build) => {
		build.addMatcher(userApi.endpoints.getUsers.matchFulfilled, (_, { payload }) => {
			return payload;
		});
		// build.addMatcher
	}
});

export default userSlice;
