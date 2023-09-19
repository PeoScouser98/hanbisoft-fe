import LoadingProgressBar from '@/common/components/Loading/LoadingProgressBar';
import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout = () => (
	<React.Suspense fallback={<LoadingProgressBar />}>
		<Outlet />
	</React.Suspense>
);

export default Layout;
