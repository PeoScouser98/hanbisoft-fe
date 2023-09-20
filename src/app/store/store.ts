import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './root.reducer';
import storage from 'redux-persist/lib/storage';
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import authApi from './api/auth.api';
import userApi from './api/userApi';
import _configs from '../configs/env.config';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['auth', 'language', 'themes'],
	blacklist: ['auth.accessToken']
};

const persistedReducer = persistReducer(persistConfig, rootReducer); // Provide a way to combine redux's root reducer

const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
			}
		}).concat([authApi.middleware, userApi.middleware]),
	devTools: _configs.ENV === 'development'
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);

window.store = store;

export default store;
