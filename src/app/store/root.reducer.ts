import { combineReducers } from '@reduxjs/toolkit';
import authSlice from './reducers/auth.reducer';
import authApi from './api/auth.api';
import pageSlice from './reducers/page.reducer';
import languageSlice from './reducers/language.reducer';
import userApi from './api/userApi';
import themeSlice from './reducers/theme.reducer';

const rootReducer = combineReducers({
	[authApi.reducerPath]: authApi.reducer,
	[userApi.reducerPath]: userApi.reducer,
	[authSlice.name]: authSlice.reducer,
	[pageSlice.name]: pageSlice.reducer,
	[themeSlice.name]: themeSlice.reducer,
	[languageSlice.name]: languageSlice.reducer
});

export default rootReducer;
