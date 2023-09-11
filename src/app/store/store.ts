import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './root.reducer';
import storage from 'redux-persist/lib/storage';
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import authApi from './api/auth.api';
import userApi from './api/userApi';

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['auth', 'language']
};

const persistedReducer = persistReducer(persistConfig, rootReducer); // Provide a way to combine redux's root reducer

const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
			}
		}).concat([authApi.middleware, userApi.middleware])
});

export const persistor = persistStore(store);

export default store;
