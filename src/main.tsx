import React from 'react';
import ReactDOM from 'react-dom/client';
import themes from 'devextreme/ui/themes';
import LoadPanel from 'devextreme-react/load-panel';
import LoadingProgressBar from './common/components/Loading/LoadingProgressBar.tsx';
const App = React.lazy(() => import('./_app.tsx'));

themes.initialized(() =>
	ReactDOM.createRoot(document.getElementById('root')).render(
		<React.Suspense
			fallback={
				<React.Fragment>
					<LoadingProgressBar />
					<LoadPanel position='center' showPane visible className='dx-theme-background-color' />
				</React.Fragment>
			}>
			<App />
		</React.Suspense>
	)
);
