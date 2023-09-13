import i18next from 'i18next';
import { I18nextProvider } from 'react-i18next';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Provider } from 'react-redux';
import { Slide, ToastContainer as Toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PersistGate } from 'redux-persist/integration/react';
import styled, { ThemeProvider } from 'styled-components';
import themeConfig from './configs/theme.config';
import useDxTheme from './hooks/useDxTheme';
import GlobalStyles from './layouts/RootLayout/GlobalStyle';
import StyleProvider from './layouts/RootLayout/StyleProvider';
import Routers from './routers/Router';
import store, { persistor } from './store/store';

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
				<StyleProvider>
					<ThemeProvider theme={themeConfig}>
						<I18nextProvider i18n={i18next}>
							<QueryClientProvider client={queryClient} contextSharing>
								<ReactQueryDevtools initialIsOpen={false} />
								<GlobalStyles />
								<Routers />
								<ToastContainer />
							</QueryClientProvider>
						</I18nextProvider>
					</ThemeProvider>
				</StyleProvider>
			</PersistGate>
		</Provider>
	);
}
const ToastContainer = () => {
	const { currentTheme } = useDxTheme();

	const toastClassName =
		currentTheme === 'light'
			? 'dx-theme-background-color dx-theme-text-color'
			: 'dx-theme-border-color-as-background-color dx-theme-text-color';

	return (
		<StyledToastContainer
			transition={Slide}
			hideProgressBar
			newestOnTop
			containerId='toast-container'
			toastClassName={toastClassName}
			autoClose={1500}
			position='bottom-right'
		/>
	);
};

const StyledToastContainer = styled(Toast)`
	& button {
		color: inherit;
	}
`;
