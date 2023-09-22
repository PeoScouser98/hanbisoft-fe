import { ThemeProvider } from '@emotion/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import i18next from 'i18next';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import __configs from './app/configs/env.config';
import theme from './app/configs/theme.config';
import GlobalStyles from './app/layouts/RootLayout/GlobalStyle';
import ToastContainer from './app/layouts/RootLayout/ToastContainer';
import Routers from './app/routers';
import store, { persistor } from './app/store/store';
import './i18n';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			enabled: true,
			useErrorBoundary: true,
			staleTime: Infinity,
			retryOnMount: true,
			refetchOnMount: 'always',
			refetchOnReconnect: 'always'
		}
	}
});

export default function App() {
	return (
		<Provider store={store}>
			<PersistGate persistor={persistor}>
				<QueryClientProvider client={queryClient} contextSharing>
					<ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
					<I18nextProvider i18n={i18next}>
						<ThemeProvider theme={theme}>
							<GlobalStyles />
							<Routers />
							<ToastContainer />
						</ThemeProvider>
					</I18nextProvider>
				</QueryClientProvider>
			</PersistGate>
		</Provider>
	);
}
