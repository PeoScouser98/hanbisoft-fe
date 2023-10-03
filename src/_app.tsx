import { ThemeProvider } from '@emotion/react';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import i18next from 'i18next';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import theme from './app/configs/theme.config';
import GlobalStyles from './app/layouts/RootLayout/GlobalStyle';
import ToastContainer from './app/layouts/RootLayout/ToastContainer';
import Routers from './app/routers';
import store, { persistor } from './app/store/store';
import 'devextreme/dist/css/dx.common.css';
import './i18n';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			enabled: true,
			useErrorBoundary: false,
			staleTime: 5 * 60 * 1000,
			retryOnMount: true,
			refetchOnMount: 'always',
			refetchOnReconnect: 'always'
		}
	}
});
const localStoragePersister = createSyncStoragePersister({ storage: window.localStorage });

export default function App() {
	return (
		<Provider store={store}>
			<PersistGate persistor={persistor}>
				<PersistQueryClientProvider
					client={queryClient}
					persistOptions={{
						persister: localStoragePersister
					}}>
					<ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
					<I18nextProvider i18n={i18next}>
						<ThemeProvider theme={theme}>
							<GlobalStyles />
							<Routers />
							<ToastContainer />
						</ThemeProvider>
					</I18nextProvider>
				</PersistQueryClientProvider>
			</PersistGate>
		</Provider>
	);
}
