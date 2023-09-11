import i18next from 'i18next';
import { I18nextProvider } from 'react-i18next';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Slide, ToastContainer } from 'react-toastify';
import GlobalStyles from './layouts/RootLayout/GlobalStyle';
import Routers from './routers/Router';

import 'react-toastify/dist/ReactToastify.css';
import '@/styles/dx.dark.css';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			cacheTime: 60 * 1000,
			staleTime: 1000,
			enabled: true,
			retryOnMount: true,
			useErrorBoundary: true
		}
	}
});

export default function App() {
	return (
		<I18nextProvider i18n={i18next}>
			<QueryClientProvider client={queryClient} contextSharing>
				<ReactQueryDevtools initialIsOpen={false} />
				<GlobalStyles />
				<Routers />
				<ToastContainer
					transition={Slide}
					hideProgressBar
					toastClassName='dx-theme-background-color dx-theme-text-color'
					autoClose={2000}
					position='top-center'
				/>
			</QueryClientProvider>
		</I18nextProvider>
	);
}
