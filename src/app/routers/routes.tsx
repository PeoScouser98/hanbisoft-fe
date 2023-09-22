import Signin from '@/app/pages/Auth/Signin';
import NotFoundPage from '@/app/pages/Error/NotFoundPage';
import React from 'react';
import { RouteObject } from 'react-router-dom';
import RootLayout from '../layouts/RootLayout';
import PermissionDeniedPage from '../pages/Error/PermissionDeniedPage';
import Home from '../pages/Home';

const UserListPage = React.lazy(() => import('@/app/pages/User'));
const EquipmentsPage = React.lazy(() => import('@/app/pages/Equipment'));
const ProfilePage = React.lazy(() => import('@/app/pages/Auth/Profile'));

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
		path: '/signin',
		element: <Signin />
	}
];

export default routesConfig;
