import { combineReducers } from '@reduxjs/toolkit';
import authApi from './api/auth.api';
import userApi from './api/userApi';
import authSlice from './reducers/auth.reducer';
import pageSlice from './reducers/page.reducer';

const rootReducer = combineReducers({
	[authApi.reducerPath]: authApi.reducer,
	[userApi.reducerPath]: userApi.reducer,
	[authSlice.name]: authSlice.reducer,
	[pageSlice.name]: pageSlice.reducer
});

export default rootReducer;
