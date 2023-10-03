import NotFoundPage from '@/app/pages/Error/NotFoundPage';
import React from 'react';
import { RouteObject } from 'react-router-dom';
import RootLayout from '../layouts/RootLayout';
import PermissionDeniedPage from '../pages/Error/PermissionDeniedPage';
import Home from '../pages/Home';
import AuthLayout from '../pages/Auth';
import ErrorBoundary from '@/common/components/ErrorBoundary';

const UserListPage = React.lazy(() => import('@/app/pages/User'));
const EquipmentsPage = React.lazy(() => import('@/app/pages/Equipment'));
const Signin = React.lazy(() => import('@/app/pages/Auth/Signin'));
const ProfilePage = React.lazy(() => import('@/app/pages/Profile'));
const ForgotPasswordPage = React.lazy(() => import('@/app/pages/Auth/ForgotPassword'));

const routesConfig: Array<RouteObject> = [
	{ path: '*', element: <NotFoundPage /> },
	{ path: '/403', element: <PermissionDeniedPage /> },
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
