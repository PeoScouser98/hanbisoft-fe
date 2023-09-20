import Signin from '@/app/pages/Auth/Signin';
import NotFoundPage from '@/app/pages/Error/NotFoundPage';
import React from 'react';
import { RouteObject } from 'react-router-dom';
import RootLayout from '../layouts/RootLayout';
import PermissionDeniedPage from '../pages/Error/PermissionDeniedPage';
import Home from '../pages/Home';

const UserLayout = React.lazy(() => import('@/app/pages/User'));
const RegisterPage = React.lazy(() => import('@/app/pages/User/RegisterPage'));
const UserListPage = React.lazy(() => import('@/app/pages/User/UserList'));

const routesConfig: Array<RouteObject> = [
	{ path: '*', element: <NotFoundPage /> },
	{ path: '/403', element: <PermissionDeniedPage /> },
	{
		path: '/',
		element: <RootLayout />,
		errorElement: <div>Error</div>,
		children: [
			{
				index: true,
				element: <Home />
			},
			{
				path: '/users',
				element: <UserLayout />,
				children: [
					{ index: true, element: <UserListPage /> },
					{ path: 'create', element: <RegisterPage /> }
				]
			}
		]
	},
	{
		path: '/signin',
		element: <Signin />
	}
];

export default routesConfig;
