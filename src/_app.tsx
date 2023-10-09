import { ThemeProvider } from '@emotion/react';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import i18next from 'i18next';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import themes from 'devextreme/ui/themes';
import { PersistGate } from 'redux-persist/integration/react';
import theme from './app/configs/theme.config';
import GlobalStyles from './app/layouts/RootLayout/GlobalStyle';
import ToastContainer from './app/layouts/RootLayout/ToastContainer';
import Routers from './app/routers';
import store, { persistor } from './app/store/store';
import { useLocalStorage } from './common/hooks/useStorage';
import 'devextreme/dist/css/dx.common.css';
import '@/common/utils/stringUtils';
import './i18n';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			enabled: true,
			useErrorBoundary: false,
			retryOnMount: true,
			refetchOnReconnect: 'always'
		}
	}
});
const persister = createSyncStoragePersister({ storage: window.localStorage });

export default function App() {
	const [storedTheme] = useLocalStorage('theme', 'generic.light');
	themes.current(storedTheme);

	return (
		<Provider store={store}>
			<PersistGate persistor={persistor}>
				<PersistQueryClientProvider client={queryClient} persistOptions={{ persister }}>
					<ReactQueryDevtools initialIsOpen={false} position='bottom-left' />
					<I18nextProvider i18n={i18next}>
						<ThemeProvider theme={theme}>
							<Routers />
							<GlobalStyles />
							<ToastContainer />
						</ThemeProvider>
					</I18nextProvider>
				</PersistQueryClientProvider>
			</PersistGate>
		</Provider>
	);
}
