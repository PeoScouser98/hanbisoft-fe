import { combineReducers } from '@reduxjs/toolkit';
import authApi from './apis/auth.api';
import userApi from './apis/user.api';
import authSlice from './reducers/auth.reducer';
import pageSlice from './reducers/page.reducer';

const rootReducer = combineReducers({
	[authApi.reducerPath]: authApi.reducer,
	[userApi.reducerPath]: userApi.reducer,
	[authSlice.name]: authSlice.reducer,
	[pageSlice.name]: pageSlice.reducer
});

export default rootReducer;
