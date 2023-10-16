import NotFoundPage from '@/app/pages/Error/NotFoundPage';
import ErrorBoundary from '@/common/components/ErrorBoundary';
import React from 'react';
import { Navigate, RouteObject } from 'react-router-dom';
import RootLayout from '../layouts/RootLayout';
import AuthLayout from '../pages/Auth';
import PermissionDeniedPage from '../pages/Error/PermissionDeniedPage';
import Home from '../pages/Home';

const UserListPage = React.lazy(() => import('@/app/pages/User'));
const EquipmentsPage = React.lazy(() => import('@/app/pages/Equipment'));
const Signin = React.lazy(() => import('@/app/pages/Auth/Signin'));
const ProfilePage = React.lazy(() => import('@/app/pages/Profile'));
const ForgotPasswordPage = React.lazy(() => import('@/app/pages/Auth/ForgotPassword'));
const SiteSettingsPage = React.lazy(() => import('../pages/SystemSettings'));

const routesConfig: Array<RouteObject> = [
	{ path: '*', element: <Navigate to='/404' replace /> },
	{ path: '/403', element: <PermissionDeniedPage /> },
	{ path: '/404', element: <NotFoundPage /> },
	{
		path: '/',
		element: <RootLayout />,
		errorElement: <ErrorBoundary />,
		children: [
			{
				index: true,
				element: <Home />
			},
			{
				path: '/users',
				element: <UserListPage />
			},
			{
				path: '/equipments',
				element: <EquipmentsPage />
			},
			{
				path: '/profile',
				element: <ProfilePage />
			},
			{
				path: '/settings',
				element: <SiteSettingsPage />
			}
		]
	},
	{
		path: '/auth',
		element: <AuthLayout />,
		children: [
			{
				path: 'signin',
				element: <Signin />
			},
			{
				path: 'forgot-password',
				element: <ForgotPasswordPage />
			}
		]
	}
];

export default routesConfig;
