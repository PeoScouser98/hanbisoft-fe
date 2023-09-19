import i18next from 'i18next';
import { I18nextProvider } from 'react-i18next';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import theme from './app/configs/theme.config';
import GlobalStyles from './app/layouts/RootLayout/providers/GlobalStyle';
import PredefineTheme from './app/layouts/RootLayout/providers/PredefinedTheme';
import ToastContainer from './app/layouts/RootLayout/providers/ToastContainer';
import Routers from './app/routers';
import store, { persistor } from './app/store/store';
import { ThemeProvider } from '@emotion/react';
import './i18n';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			enabled: true,
			retryOnMount: true,
			useErrorBoundary: true
		}
	}
});

export default function App() {
	return (
		<Provider store={store}>
			<PersistGate persistor={persistor}>
				<QueryClientProvider client={queryClient} contextSharing>
					<I18nextProvider i18n={i18next}>
						<PredefineTheme>
							<ThemeProvider theme={theme}>
								<ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
								<GlobalStyles />
								<Routers />
								<ToastContainer />
							</ThemeProvider>
						</PredefineTheme>
					</I18nextProvider>
				</QueryClientProvider>
			</PersistGate>
		</Provider>
	);
}
