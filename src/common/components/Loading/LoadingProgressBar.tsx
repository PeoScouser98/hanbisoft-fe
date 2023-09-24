/**
 * @copyright @PeoScouser98
 */

import React from 'react';
import nProgress from 'nprogress';
import './nprogress.css';

const LoadingProgressBar = () => {
	nProgress.configure({
		showSpinner: false
	});
	React.useEffect(() => {
		nProgress.start();

		return () => {
			nProgress.done();
		};
	}, []);

	return null;
};

export default LoadingProgressBar;
