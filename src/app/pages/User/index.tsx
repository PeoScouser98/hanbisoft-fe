import RestrictedPermissionLayout from '@/app/layouts/RestrictedLayouts/RestrictedPermissionLayout';
import LoadingProgressBar from '@/common/components/Loading/LoadingProgressBar';
import React from 'react';
import { Outlet } from 'react-router-dom';

export default function UserLayout() {
	return (
		<RestrictedPermissionLayout>
			<React.Suspense fallback={<LoadingProgressBar />}>
				<Outlet />
			</React.Suspense>
		</RestrictedPermissionLayout>
	);
}
