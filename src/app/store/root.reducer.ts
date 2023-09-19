import { combineReducers } from '@reduxjs/toolkit';
import authApi from './api/auth.api';
import userApi from './api/userApi';
import authSlice from './reducers/auth.reducer';
import pageSlice from './reducers/page.reducer';
import themeSlice from './reducers/theme.reducer';

const rootReducer = combineReducers({
	[authApi.reducerPath]: authApi.reducer,
	[userApi.reducerPath]: userApi.reducer,
	[authSlice.name]: authSlice.reducer,
	[pageSlice.name]: pageSlice.reducer,
	[themeSlice.name]: themeSlice.reducer
});

export default rootReducer;
