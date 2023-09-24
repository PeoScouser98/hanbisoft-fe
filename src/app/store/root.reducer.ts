import { combineReducers } from '@reduxjs/toolkit';
import authApi from './apis/auth.api';
import userApi from './apis/user.api';
import authSlice from './reducers/auth.reducer';
import pageSlice from './reducers/page.reducer';
import equipmentApi from './apis/equipment.api';
import themeSlice from './reducers/theme.reducer';

const rootReducer = combineReducers({
	[authApi.reducerPath]: authApi.reducer,
	[userApi.reducerPath]: userApi.reducer,
	[equipmentApi.reducerPath]: equipmentApi.reducer,
	[authSlice.name]: authSlice.reducer,
	[pageSlice.name]: pageSlice.reducer,
	[themeSlice.name]: themeSlice.reducer
});

export default rootReducer;
